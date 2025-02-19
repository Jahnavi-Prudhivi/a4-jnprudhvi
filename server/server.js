require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const app = express();
const port = process.env.PORT || 3000;

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
const dbName = "taskDB";
let db, usersCollection, tasksCollection;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Session setup
app.use(
    session({
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
MongoClient.connect(mongoURI)
    .then((client) => {
        db = client.db(dbName);
        usersCollection = db.collection("users");
        tasksCollection = db.collection("tasks");
        console.log("Connected to MongoDB");
    })
    .catch((error) => console.error("MongoDB connection error:", error));

// Passport setup
passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await usersCollection.findOne({ _id: new ObjectId(id) });
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await usersCollection.findOne({ username });
            if (!user) return done(null, false, { message: "User not found" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return done(null, false, { message: "Incorrect password" });

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

// Auth Routes
app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: "Username and password required" });

        const existingUser = await usersCollection.findOne({ username });
        if (existingUser) return res.status(400).json({ error: "Username already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        await usersCollection.insertOne({ username, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error registering user" });
    }
});

app.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({ message: "Login successful", user: req.user });
});

app.post("/logout", (req, res) => {
    req.logout(err => {
        if (err) return res.status(500).json({ error: "Logout failed" });
        res.json({ message: "Logged out successfully" });
    });
});

// Middleware for Authentication
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ error: "Unauthorized" });
};

// Task Routes
app.get("/tasks", ensureAuthenticated, async (req, res) => {
    const tasks = await tasksCollection.find({ userId: req.user._id.toString() }).toArray();
    res.json(tasks);
});

app.post("/tasks", ensureAuthenticated, async (req, res) => {
    const task = { ...req.body, userId: req.user._id.toString() };
    await tasksCollection.insertOne(task);
    res.json(await tasksCollection.find({ userId: req.user._id.toString() }).toArray());
});

app.put("/tasks/:id", ensureAuthenticated, async (req, res) => {
    const { id } = req.params;
    const updatedTask = req.body;
    const result = await tasksCollection.updateOne(
        { _id: new ObjectId(id), userId: req.user._id.toString() },
        { $set: updatedTask }
    );
    if (result.matchedCount === 0) return res.status(403).json({ error: "Not authorized" });

    res.json(await tasksCollection.find({ userId: req.user._id.toString() }).toArray());
});

app.delete("/tasks/:id", ensureAuthenticated, async (req, res) => {
    const { id } = req.params;
    const result = await tasksCollection.deleteOne({ _id: new ObjectId(id), userId: req.user._id.toString() });
    if (result.deletedCount === 0) return res.status(403).json({ error: "Not authorized" });

    res.json(await tasksCollection.find({ userId: req.user._id.toString() }).toArray());
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

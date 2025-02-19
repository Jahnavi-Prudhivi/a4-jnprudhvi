# Todo Application (React + Express + MongoDB)

## Introduction

This is a To-Do Application built using React, Express, and MongoDB. The application allows users to create, manage, and delete tasks with additional features like priority levels, deadlines, and notes.

Initially, the project started with a simple frontend using basic HTML, CSS, and JavaScript. However, as the project evolved, the frontend was rewritten entirely using the React framework to improve modularity, scalability, and maintainability. The backend was built using Express.js and MongoDB to store tasks persistently.

## Tech Stack

- **Frontend:** React, React Router, Axios  
- **Backend:** Node.js, Express, MongoDB, Mongoose  
- **Authentication:** Passport.js (GitHub authentication was attempted but faced issues)  
- **Database:** MongoDB  
- **Styling:** CSS  
- **Version Control:** GitHub  

## Project Overview

The application includes the following features:

- **User Authentication** (GitHub authentication was attempted but faced issues)
- **Task Management** (Add, Edit, Delete, View Tasks)
- **Priority Levels** (Low, Medium, High)
- **Due Dates** (Tasks have associated deadlines)
- **Notes Section** (Additional information about tasks)

## Project Evolution

### Transition to a Full React Frontend

Originally, the frontend was built using basic HTML and JavaScript, making it difficult to manage state and UI updates efficiently. The decision was made to rewrite the frontend in React to:

- Enhance component reusability
- Improve state management
- Implement React Router for seamless navigation

### Integration with Express and MongoDB

After completing the frontend migration to React, the next step was to set up a backend using Express.js and MongoDB for persistent data storage. The backend was developed with the following considerations:

- RESTful API architecture
- MongoDB Atlas for cloud-based database hosting
- Mongoose for schema validation
- CORS support for communication between the frontend and backend

### GitHub Authentication Attempt

Initially, Passport.js was used to integrate GitHub Authentication, allowing users to log in using their GitHub accounts. However, several issues arose:

- **Callback URL misconfiguration:** GitHub required HTTPS for OAuth callback, causing issues during local development.
- **Session handling problems:** Passport.js sessions required proper cookie management, which led to inconsistencies in authentication state.
- **CSRF token mismatch errors:** GitHub's OAuth system required additional security configurations, which led to token validation issues.

Due to these issues, GitHub authentication was temporarily disabled, and the system currently uses local session-based authentication.

## Installation

### Clone the repository:

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

### Backend Setup

Navigate to the backend directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Set up environment variables (`.env` file in `server/` directory):

```
MONGO_URI=your_mongodb_connection_string
PORT=3000
SESSION_SECRET=your_secret_key
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Start the backend server:

```bash
npm run dev
```

### Frontend Setup

Navigate to the frontend directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the React development server:

```bash
npm start
```

## Running the Application

Ensure both frontend and backend servers are running:

```bash
# Run backend
cd server
npm run dev

# Run frontend
cd client
npm start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Endpoints

### Authentication

- **POST** `/login` - User login
- **POST** `/register` - User registration
- **GET** `/logout` - Logs out the user

### Tasks

- **GET** `/tasks` - Fetch all tasks
- **POST** `/tasks` - Create a new task
- **DELETE** `/tasks/:id` - Delete a task

## Challenges Faced

- **GitHub OAuth Issues:** Encountered multiple authentication errors, leading to its temporary removal.
- **State Management in React:** Managing form state and API responses required restructuring components.
- **CORS Issues:** Initially, cross-origin requests were blocked, requiring proper backend configuration.
- **MongoDB Connection Handling:** Faced issues with handling concurrent requests in MongoDB, resolved using connection pooling.

## Future Improvements

- **Reattempt GitHub Authentication** with better session handling.
- **Improve UI/UX** for a better user experience.
- **Implement Redux** for better state management.
- **Add Task Categories** for better organization.

## Conclusion

This project showcases the full-stack development process using React, Express, and MongoDB. Although GitHub authentication faced issues, the app provides a functional task management system with a structured backend and responsive frontend.

## Author

**Jahnavi**

- **GitHub:** [your-github-profile](https://github.com/your-username)
- **License:** MIT

import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true
});

export const registerUser = (user) => API.post("/register", user);
export const loginUser = (user) => API.post("/login", user);
export const logoutUser = () => API.post("/logout");
export const fetchTasks = () => API.get("/tasks");
export const addTask = (task) => API.post("/tasks", task);
export const updateTask = (id, task) => API.put(`/tasks/${id}`, task);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

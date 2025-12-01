import axios from "axios";

const API_URL = "http://localhost:3000/tasks";

export const getTasks = () => axios.get(API_URL);
export const addTask = (task) => axios.post(API_URL, task);
export const updateTask = (id, updates) =>
  axios.put(`${API_URL}/${id}`, updates);
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);

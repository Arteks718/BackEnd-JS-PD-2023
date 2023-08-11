import axios from "axios";
const httpClient = axios.create({ baseURL: "http://localhost:5000/api" });

export const getHttpUsers = () => httpClient.get('/users')
export const deleteHttpUsers = (userId:number) => httpClient.delete(`/users/${userId}`)

export const getHttpTasks = () => httpClient.get('/tasks')
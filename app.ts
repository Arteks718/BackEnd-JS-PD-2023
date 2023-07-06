import express from 'express'
import path from 'path'
const app = express();

app.use(express.json())
app.use('/', express.static("public"))

//CRUD for user

// get all users
app.get('/users', (req, res) => {})
// get user by id
app.get('/users/id', (req, res) => {})
// create new user
app.post('/users', (req, res) => {})
// update user by id
app.patch('/users/id', (req, res) => {})
// delete user by id
app.delete('/users/id', (req, res) => {})

export default app;
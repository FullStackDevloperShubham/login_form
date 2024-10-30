const express = require('express')
const app = express()
// cors configuration
const cors = require('cors')
// dotenv configuration
require('dotenv').config()

// postgres connection
const { pool } = require('./Database/connect.database')
// controllers
const { createTheUser, getAllUser, getSingleUser, deleteTheUser, updateTheuser, deleteTheAccount } = require('./Controllers/form.controller')


// backend server running
const port = process.env.PORT || 3000


// cors config
app.use(cors())
app.use(cors({ origin: 'http://localhost:5173' }))

// other middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// simple route
app.get('/', (req, res) => {
  res.send('hello world')
})

// post route
app.post('/user', createTheUser)
// getting all user
app.get('/get-all-users', getAllUser)
// get a single user by id
app.get('/get-user/:id', getSingleUser)
// delete the user
app.delete('/delete-user/:id', deleteTheUser)
// update the user
app.patch('/update-user/:id', updateTheuser)
// delete the user account
app.delete('/delete-account/:id', deleteTheAccount)


// listen the backend server
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
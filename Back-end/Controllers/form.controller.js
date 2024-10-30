const express = require('express')
const pool = require('../Database/connect.database')
// import bcryptjs
const bcrypt = require('bcryptjs')

// create a user
const createTheUser = async (req, res) => {
  try {
    // taking the data from the request
    const { email, username, password } = req.body
    // console.log(email, username, password)

    // checking the fields
    if (!email || !username || !password) {
      return res.send(400).json({
        success: false,
        message: 'please enter all the fields'
      })
    }

    // hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    // console.log(hashedPassword)


    // create the the use in the database
    const user = await pool.query('INSERT INTO form_details (name, email, password) VALUES ($1, $2, $3) ', [username, email, hashedPassword])
    // console.log(user)

    res.sendStatus(200).json({
      success: true,
      message: 'user created successfully',
      user
    })
  } catch (error) {
    console.log(error)
  }
}

// get the all user
const getAllUser = async (req, res) => {
  try {
    const allUser = await pool.query('SELECT * FROM form_details')
    const user = allUser.rows
    // console.log(allUser.rows)

    res.status(200).json({
      success: true,
      message: 'all user',
      user
    })
  } catch (error) {
    console.log({ error: error.message })
  }
}

// get single user by id 
const getSingleUser = async (req, res) => {

  try {
    // getting the user id
    const { id } = req.params

    // matching the requested id with database id
    const user = await pool.query('SELECT * FROM form_details WHERE id = $1', [id])
    const machedUser = user.rows
    res.send(machedUser)
  } catch (error) {
    console.log({ error: error.message })
  }
}

// delete the user user 
const deleteTheUser = async (req, res) => {

  try {
    // getting the user id
    const { id } = req.params
    const user = await pool.query('DELETE FROM form_details WHERE id = $1', [id])
    res.send(user)
  } catch (error) {
    console.log({ error: error.message })
  }
}

// update the user details
const updateTheuser = async (req, res) => {
  try {

    // getting the user id
    const { username, email } = req.body;
    const { id } = req.params;
    // Find the user using the request ID
    const userResult = await pool.query('SELECT * FROM form_details WHERE id = $1', [id]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }


    // Update the user
    const updatedUser = await pool.query(
      'UPDATE form_details SET name = $1, email = $2 WHERE id = $3 RETURNING *',
      [username || userResult.rows[0].name, email, id]
    );

    console.log(updatedUser.rows[0]);

    // Send the response
    res.json(updatedUser.rows[0]);
  } catch (error) {
    console.log({ error: error.message })
  }
}


// delete the user 
const deleteTheAccount = async (req, res) => {
  try {
    // delete the user by id
    // getting the user id by req.params
    const { id } = req.params
    const deletedUser = await pool.query('DELETE FROM form_details WHERE id = $1', [id])
    // console.log(deletedUser)
    res.send(deletedUser.rows)

  } catch (error) {
    console.log({ error: error.message })
  }
}

module.exports = {
  createTheUser,
  getAllUser,
  getSingleUser,
  deleteTheUser,
  updateTheuser,
  deleteTheAccount
}

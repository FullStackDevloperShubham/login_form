const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'simple_form_details',
  password: 'shubham',
  port: 5432,
})

module.exports = pool
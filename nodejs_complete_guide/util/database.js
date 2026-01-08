// Imports
const mysql = require('mysql2');

// Create a pool of connections to the database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-complete',
    password: 'root123'
});

// Export the pool of connections to the database
module.exports = pool.promise();
// Imports
const Sequelize = require("sequelize");

// Create a new Sequelize instance
const sequelize = new Sequelize('node-complete', 'root', 'root123', {
    dialect: 'mysql',
    host: 'localhost'
});

// Export the Sequelize instance
module.exports = sequelize;
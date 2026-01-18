// Imports
const sequelize = require("../util/database");
const Sequelize = require("sequelize");

// Define the Order model
const Order = sequelize.define("order", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

// Export the Order model
module.exports = Order;
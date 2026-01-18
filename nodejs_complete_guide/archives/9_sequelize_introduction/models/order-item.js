// Imports
const Sequelize = require("sequelize");
const sequelize = require("../util/database");

// Define the OrderItem model
const OrderItem = sequelize.define("orderItem", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

// Export the OrderItem model
module.exports = OrderItem;
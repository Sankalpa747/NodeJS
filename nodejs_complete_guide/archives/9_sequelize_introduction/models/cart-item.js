// Imports
const Sequelize = require("sequelize");
const sequelize = require("../util/database");

// Define the CartItem model
const CartItem = sequelize.define("cartItem", {
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

// Export the CartItem model
module.exports = CartItem;
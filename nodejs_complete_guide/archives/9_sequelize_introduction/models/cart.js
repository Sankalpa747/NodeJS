// Imports
const Sequelize = require("sequelize");
const sequelize = require("../util/database");

// Define the Cart model
const Cart = sequelize.define("cart", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
});

// Export the Cart model
module.exports = Cart;
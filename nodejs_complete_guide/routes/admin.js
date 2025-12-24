// Importing express module (To create a router)
const express = require("express");

// Importing the products controller
const productsController = require("../controllers/products");

// Create a router
const router = express.Router();

// Middleware function for the /add-product route
router.get("/add-product", productsController.getAddProduct);

// Middleware function for the /add-product route
router.post("/add-product", productsController.postAddProduct);

// Export the router and the products array
module.exports = router;
// Importing express module (To create a router)
const express = require("express");

// Importing the products controller
const productsController = require("../controllers/products");

// Create a router
const router = express.Router();

// Middleware function for the / route
router.get("/", productsController.getProducts);

// Export the router
module.exports = router;
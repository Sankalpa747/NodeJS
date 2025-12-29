// Importing express module (To create a router)
const express = require("express");

// Importing the products controller
const adminController = require("../controllers/admin.js");

// Create a router
const router = express.Router();

// Middleware function for the /add-product route
router.get("/add-product", adminController.getAddProduct);

// Middleware function for the /add-product route
router.post("/add-product", adminController.postAddProduct);

// Middleware function for the /edit-product route
router.get("/edit-product/:productId", adminController.getEditProduct);

// Middleware function for the /edit-product route
router.post("/edit-product", adminController.postEditProduct);

// Middleware function for the /products route
router.get("/products", adminController.getProducts);

// Middleware function for the /delete-product route
router.post("/delete-product", adminController.postDeleteProduct);

// Export the router and the products array
module.exports = router;
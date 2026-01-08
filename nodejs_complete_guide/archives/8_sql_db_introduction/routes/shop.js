// Importing express module (To create a router)
const express = require("express");

// Importing the products controller
const shopController = require("../controllers/shop.js");

// Create a router
const router = express.Router();

// Middleware function for the / route
router.get("/", shopController.getIndex);

// Middleware function for the /products route
router.get("/products", shopController.getProducts);

// Middleware function for the /products/:id route
router.get("/products/:productId", shopController.getProduct);

// Middleware function for the /cart route
router.get("/cart", shopController.getCart);

// Middleware function for the /cart route (POST request)
router.post("/cart", shopController.postCart);

// Middleware function for the /cart-delete-item route (POST request)
router.post("/cart-delete-item", shopController.postCartDeleteProduct);

// Middleware function for the /checkout route
router.get("/checkout", shopController.getCheckout);

// Middleware function for the /orders route
router.get("/orders", shopController.getOrders);

// Export the router
module.exports = router;
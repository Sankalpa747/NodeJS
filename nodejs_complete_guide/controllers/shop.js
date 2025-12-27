// Importing the Product model
const Product = require("../models/product");

/**
 * Get the products page
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
exports.getProducts = (req, res, next) => {
    console.log("Product controller - getProducts");

    // Fetch all products
    // Callback is introduced because the fetchAll method's file operations are asynchronous
    const products = Product.fetchAll((products) => {
        // Render the shop.pug file
        res.render("shop/product-list", { 
            prods: products, 
            docTitle: "All Products", 
            path: "/products", 
        });
    });
}

/**
 * Get the index page
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
exports.getIndex = (req, res, next) => {
    res.render("shop/index", {
        docTitle: "Shop Index",
        path: "/",
    });
}

/**
 * Get the cart page
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
exports.getCart = (req, res, next) => {
    res.render("shop/cart", {
        docTitle: "Your Cart",
        path: "/cart",
    });
}

/**
 * Get the checkout page
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout", {
        docTitle: "Checkout",
        path: "/checkout",
    });
}

/**
 * Get the orders page
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
exports.getOrders = (req, res, next) => {
    res.render("shop/orders", {
        docTitle: "Your Orders",
        path: "/orders",
    });
}
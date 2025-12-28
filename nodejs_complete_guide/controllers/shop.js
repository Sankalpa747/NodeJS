// Importing the Product model
const Product = require("../models/product");
const Cart = require("../models/cart");

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
            pageTitle: "All Products", 
            path: "/products", 
        });
    });
}

/**
 * Get the product by id page
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
exports.getProduct = (req, res, next) => {
    console.log("Product controller - getProduct");
    // GET PRODUCT BY ID
    const productId = req.params.productId;
    Product.findById(productId, (product) => {
        console.log(product);
        res.render("shop/product-detail", { 
            product: product, 
            pageTitle: product.title, 
            path: "/products" 
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
    // Fetch all products
    // Callback is introduced because the fetchAll method's file operations are asynchronous
    const products = Product.fetchAll((products) => {
        // Render the shop.pug file
        res.render("shop/index", { 
            prods: products, 
            pageTitle: "Shop Index", 
            path: "/", 
        });
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
        pageTitle: "Your Cart",
        path: "/cart",
    });
}

/**
 * Post the add to cart page
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
exports.postCart = (req, res, next) => {
    console.log("Product controller - postCart")
    const productId = req.body.productId;
    const price = req.body.price;

    // Add the product to the cart
    Cart.addProduct(productId, price);

    // Redirect to the cart page
    res.redirect("/cart");
}

/**
 * Get the checkout page
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout", {
        pageTitle: "Checkout",
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
        pageTitle: "Your Orders",
        path: "/orders",
    });
}
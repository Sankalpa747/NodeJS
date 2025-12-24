// Importing the Product model
const Product = require("../models/product");

/**
 * Get the add product page
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
exports.getAddProduct = (req, res, next) => {
    console.log("Product controller - getAddProduct");
    // Render the add-product.pug file
    res.render("add-product", { 
        docTitle: "Add Product", 
        path: "/admin/add-product",
        activeAddProduct: true,
        productCSS: true,
        formCSS: true,
    });
}
 
/**
 * Post the add product page
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
exports.postAddProduct = (req, res, next) => {
    console.log("Product controller - postAddProduct");

    // Create a new product
    const product = new Product(req.body.title);
    product.save();

    // Redirect to the / route
    res.redirect("/");
}

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
        res.render("shop", { 
            prods: products, 
            docTitle: "Shop", 
            path: "/", 
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
}
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
    res.render("admin/edit-product", { 
        pageTitle: "Add Product", 
        path: "/admin/add-product",
        editing: false,
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

    // Get the body of the request
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;

    // Create a new product
    const product = new Product(null, title, imageUrl, description, price);

    // Save the product
    product.save().then(() => {
        // Redirect to the / route
        res.redirect("/");
    }).catch(err => {
        console.log(err);
    });
}

/**
 * Get the edit product page
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
exports.getEditProduct = (req, res, next) => {
    console.log("Product controller - getEditProduct");
    const prodId = req.params.productId;

    // Get the edit mode from the query parameters
    const editMode = req.query.edit === "true";

    // If the edit mode is not true, redirect to the home page
    if (!editMode) {
        return res.redirect("/");
    }

    // Find the product by id
    Product.findById(prodId, (product) => {

        // If the product is not found, redirect to the home page
        if (!product) {
            return res.redirect("/");
        }
        console.log(product);

        // Render the edit-product.ejs file
        res.render("admin/edit-product", { 
            pageTitle: "Edit Product", 
            path: "/admin/edit-product",
            product: product,
            editing: editMode,
        });
    });
}

/**
 * Post the edit product page
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
exports.postEditProduct = (req, res, next) => {
    console.log("Product controller - postEditProduct");

    // Get the body of the request
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const updatedPrice = req.body.price;

    // Create a new product
    const product = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
    product.save();

    // Redirect to the /admin/products route
    res.redirect("/admin/products");    
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
        res.render("admin/products", { 
            prods: products, 
            pageTitle: "Admin Products", 
            path: "/products", 
        });
    });
}

/**
 * Post the delete product page
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
exports.postDeleteProduct = (req, res, next) => {
    console.log("Product controller - postDeleteProduct");
    const prodId = req.body.productId;

    // Delete the product by id
    Product.deleteById(prodId, () => {
        // Redirect to the /admin/products route
        res.redirect("/admin/products");
    });
}
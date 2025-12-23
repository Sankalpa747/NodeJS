// Importing express module (To create a router)
const express = require("express");
// Importing path module (To join the current directory with the views directory and the add-product.html file)
const path = require("path");

// Importing path module (To get the directory name of the current file)
const rootDir = require("../util/path");

// Create a router
const router = express.Router();

const products = [];

// Middleware function for the /add-product route
router.get("/add-product", (req, res, next) => {
    console.log("admin.js");
    // Join the current directory with the views directory and the add-product.html file
    // rootDir - The directory name of the current file
    // 'views' - The directory name
    // 'add-product.html' - The file name
    //res.sendFile(path.join(rootDir, "views", "add-product.html"));

    // Render the add-product.pug file
    res.render("add-product", { docTitle: "Add Product", path: "/admin/add-product" });
});

// Middleware function for the /add-product route
router.post("/add-product", (req, res, next) => {
    products.push({title: req.body.title});

    // Redirect to the / route
    res.redirect("/");
});

// Export the router and the products array
exports.router = router;
exports.products = products;
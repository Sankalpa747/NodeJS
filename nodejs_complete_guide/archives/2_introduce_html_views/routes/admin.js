// Importing express module (To create a router)
const express = require("express");
// Importing path module (To join the current directory with the views directory and the add-product.html file)
const path = require("path");

// Importing path module (To get the directory name of the current file)
const rootDir = require("../util/path");


// Create a router
const router = express.Router();

// Middleware function for the /add-product route
router.get("/add-product", (req, res, next) => {
    console.log("admin.js");
    // Join the current directory with the views directory and the add-product.html file
    // rootDir - The directory name of the current file
    // 'views' - The directory name
    // 'add-product.html' - The file name
    res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

// Middleware function for the /add-product route
router.post("/add-product", (req, res, next) => {
    // Parse the body of the request
    console.log(req.body);

    // Redirect to the / route
    res.redirect("/");
});

// Export the router
module.exports = router;
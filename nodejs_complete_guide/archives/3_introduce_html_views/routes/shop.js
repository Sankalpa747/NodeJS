// Importing express module (To create a router)
const express = require("express");
// Importing path module (To join the current directory with the views directory and the shop.html file)
const path = require("path");

// Importing path module (To get the directory name of the current file)
const rootDir = require("../util/path");

// Create a router
const router = express.Router();

// Middleware function for the / route
router.get("/", (req, res, next) => {
    console.log("shop.js");
    // Join the current directory with the views directory and the shop.html file
    // rootDir - The directory name of the current file
    // 'views' - The directory name
    // 'shop.html' - The file name
    res.sendFile(path.join(rootDir, "views", "shop.html"));
});

// Export the router
module.exports = router;
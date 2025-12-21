// Importing express module (To create a router)
const express = require("express");

// Create a router
const router = express.Router();

// Middleware function for the /add-product route
router.get("/add-product", (req, res, next) => {
    console.log("In the add-product middleware!");
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

// Middleware function for the /product route
router.post("/product", (req, res, next) => {
    // Parse the body of the request
    console.log(req.body);

    // Redirect to the / route
    res.redirect("/");
});

// Export the router
module.exports = router;
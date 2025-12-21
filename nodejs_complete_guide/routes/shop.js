// Importing express module (To create a router)
const express = require("express");

// Create a router
const router = express.Router();

// Middleware function for the / route
router.use("/", (req, res, next) => {
    console.log("In the shop middleware!");
    res.send('<h1>Hello from the second middleware!</h1>');
});

// Export the router
module.exports = router;
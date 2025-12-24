// imports
const express = require("express");

// Create a router
const router = express.Router();

const users = [];

// Route for the home page
router.get("/", (req, res, next) => {
    res.render("index", { title: "Home", path: "/" });
});

// Route for the users page
router.post("/users", (req, res, next) => {
    console.log(req.body);
    users.push({ name: req.body.name });
    res.redirect("/users");
});

router.get("/users", (req, res, next) => {
    res.render("users", {
        title: "Users",
        users: users,
        path: "/users"
    });
});

// Export the router
module.exports = router;
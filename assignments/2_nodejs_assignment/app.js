// Importing express
const express = require("express"); 

// Creating an instance of express
const app = express();

// Creating a middleware
app.use("/users", (req, res, next) => {
    console.log("In the first middleware!");
    res.send("<h1>Users Page</h1>");
});

// Creating a second middleware
app.use("/", (req, res, next) => {
    console.log("In the second middleware!");
    res.send("<h1>Hello from Express!</h1>");
});

// Listening to the port 3000
app.listen("3000");
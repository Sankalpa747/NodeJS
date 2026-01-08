// Imports
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// Importing routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// Importing the 404 controller
const errorController = require("./controllers/error");

// Importing the database pool
const db = require("./util/database");

// Create an express application
const app = express();

// App set() allows us to set global configuration for the express application
// Another way of sharing data in the application
// Can share any value such as example:- app.set("title", "My App") / app.set("view engine", "pug");
app.set("view engine", "ejs");
// Set the views directory
app.set("views", "views");

// Parse the body of the request
app.use(bodyParser.urlencoded({extended: false}));
// Serve static files from the public directory (Allows us to access the css files in the public directory from the views directory)
app.use(express.static(path.join(__dirname, "public")));

// Admin and shop routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);

// 404 middleware
app.use(errorController.get404);

// Listen to the port 3000
app.listen(3000);
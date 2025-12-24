// Imports
const express = require("express");
const indexRoutes = require("./routes/index");
const bodyParser = require("body-parser");
const path = require("path");

// Create an express application
const app = express();

// Use the body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Use the static middleware
// app.use(express.static(path.join(__dirname, "public")));

// Set the view engine and views directory
app.set("view engine", "ejs");
app.set("views", "views");

// Use the index routes
app.use(indexRoutes);

// Start the server
app.listen(3000);
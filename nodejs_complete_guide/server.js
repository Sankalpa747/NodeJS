// Basic NodeJS (Creating server / Event driven architecture)

// Importing express module (To create a server which listens to HTTP requests and send responses)
const express = require("express");
// Importing body-parser module (To parse the body of the request)
const bodyParser = require("body-parser");

// Importing routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// Create an express application
const app = express();

// Parse the body of the request
app.use(bodyParser.urlencoded({extended: false}));
// Admin routes
app.use(adminRoutes);
app.use(shopRoutes);

// Listen to the port 3000
app.listen(3000);
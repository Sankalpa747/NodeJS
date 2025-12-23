// Basic NodeJS (Creating server / Event driven architecture)

// Importing express module (To create a server which listens to HTTP requests and send responses)
const express = require("express");
// Importing body-parser module (To parse the body of the request)
const bodyParser = require("body-parser");
// Importing path module (To join the current directory with the views directory and the page-not-found.html file)
const path = require("path");

// Importing routes
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// Create an express application
const app = express();

// App set() allows us to set global configuration for the express application
// Another way of sharing data in the application
// Can share any value such as example:- app.set("title", "My App") / app.set("view engine", "pug");
app.set("view engine", "pug");
// Set the views directory
app.set("views", "views");

// Parse the body of the request
app.use(bodyParser.urlencoded({extended: false}));
// Serve static files from the public directory
// __dirname - The current directory of the file
// 'public' - The directory name
// 'main.css' - The file name
// With this now we can access the css files in the public directory from the views directory
// For example, if we have a css file in the public directory called main.css, we can access it in the views directory by using the following code:
// <link rel="stylesheet" href="/css/main.css">
// This will serve the main.css file to the client
app.use(express.static(path.join(__dirname, "public")));

// Admin and shop routes
app.use("/admin", adminData.router);
app.use(shopRoutes);

// 404 middleware
app.use((req, res, next) => {
    // Join the current directory with the views directory and the page-not-found.html file
    // __dirname - The current directory of the file
    // 'views' - The directory name
    // 'page-not-found.html' - The file name
    //res.status(404).sendFile(path.join(__dirname, "views", "page-not-found.html"));

    // Render the page-not-found.pug file
    res.status(404).render("page-not-found", { docTitle: "Page Not Found" });
});

// Listen to the port 3000
app.listen(3000);
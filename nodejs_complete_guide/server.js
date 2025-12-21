// Basic NodeJS (Creating server / Event driven architecture)

// Importing HTTP module (To create a server which listens to HTTP requests and send responses)
//const http = require("http");

// Importing express module (To create a server which listens to HTTP requests and send responses)
const express = require("express");

// Create an express application
const app = express();

// Middleware function
app.use((req, res, next) => {
    console.log("In the middleware!");
    // 'next()' is a function that allows the request to continue to the next middleware function
    next();
});

// Send a response to the client
app.use((req, res, next) => {
    console.log("In the second middleware!");
    res.send('<h1>Hello from the second middleware!</h1>');
});

// Create a server
// Pass the express application to the http server
//const server = http.createServer(app);

// Server is listening hence the application doesn't stop and keep listening
//server.listen(3000);

// Listen to the port 3000
app.listen(3000);
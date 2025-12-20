// Basic NodeJS (Creating server / Event driven architecture)

// Importing HTTP module (To create a server which listens to HTTP requests and send responses)
const http = require("http");

// Import the request handle function from routes.js module
const requestHandleFunction = require("./routes")

// Normal function and create a server
// function requestListener(request, response) {
//     console.log(request)
// }
// const server = http.createServer(requestListener)

// Create a server
const server = http.createServer(requestHandleFunction.handler);

// Server is listening hence the application doesn't stop and keep listening
server.listen(3000)

// Close the program
//process.exit()
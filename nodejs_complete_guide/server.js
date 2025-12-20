// Basic NodeJS (Creating server / Event driven architecture)

// Importing HTTP module (To create a server which listens to HTTP requests and send responses)
const http = require("http");

// Create a server
const server = http.createServer();

// Server is listening hence the application doesn't stop and keep listening
server.listen(3000)
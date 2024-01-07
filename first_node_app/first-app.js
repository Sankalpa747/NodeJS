// Import a functionality into the file 
// Request the 'fs' module which is one of the Node's core modules
// 'fs' - For manipulating the file system
const fs = require('fs')

// Write a file to hard-drive by levaraging the fs module
fs.writeFileSync('hello.txt', "Hello from Node.js")

// Printing values to the console
console.log("Hello from Node.js")
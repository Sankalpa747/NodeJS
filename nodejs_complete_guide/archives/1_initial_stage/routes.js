// Importing to work with the file system
const fs = require("fs");

// Method for handling requets and responses routes
const requestHandler = (request, response) => {
    // Read from request
    //console.log(request.url, request.method, request.headers);
    const url = request.url
    const method = request.method

    // '===' - The strict equality operator requires both the value and the type to be the same for the comparison to be true.
    if (url === "/") {
        response.write('<html>');
        response.write('<head><title>Enter Message</title></head>');
        // Assigning a name to the input element will add that element with the value automatically to the POST request
        response.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        response.write('</html>');
        return response.end()
    }
    else if (url === "/message" && method === "POST") {
        // Holds the request body
        const body = [];

        // STREAM
        // First, start reading data 
        // (Process Asynchronous)
        // Access the request data by registering an event listener 
        // Request data is a stream of data make available as different data chunks
        // 'date' event will be fired whenever a new chunk of data is ready
        request.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk)
        });

        // (Process Asynchronous)
        // Second, buffer and prepare the already read data
        // Listener triggers once the incomming data is successfully read
        return request.on('end', () => {
            // At this moment the 'body' array has all the content from the request

            // BUFFER 
            // 'Buffer' is available globally by NodeJS and it can concat the message body
            // We use toString() because we know the incoming data is text
            const parsedBody = Buffer.concat(body).toString();

            // Received data as key and value pairs seperated by '='. Therefore, only extract the value
            const message = parsedBody.split('=')[1]

            // Write to file
            // Another event listener which will be triggered once the file write is done
            fs.writeFile('message.txt', message, (err) => {
                // Redirect to '/' route
                response.statusCode = 302
                response.setHeader('Location', '/')
                return response.end()
            })
        });

        // // Redirect to '/' route
        // response.statusCode = 302
        // response.setHeader('Location', '/')
        // return response.end()
    }

    // Response
    response.setHeader('Content-Type', 'text/html');
    response.write('<html>');
    response.write('<head><title>My First Page</title></head>');
    response.write('<body><h1>Hello from my NodeJS server!</h1></body>');
    response.write('</html>');
    response.end();
}

// Export the function to be used by other modules
module.exports = {
    handler: requestHandler
}

// Alternative ways of defining exports
// module.exports = requestHandler

// module.exports.handler = requestHandler
// module.exports.someText = "JustSomeText"

// exports.handler = requestHandler
// exports.someText = "JustSomeText"
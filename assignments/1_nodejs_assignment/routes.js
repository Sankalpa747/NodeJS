
const fs = require("fs")

const handleRequest = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === "/") {
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<head><title>My First Assignment</title></head>");
        res.write("<body>");
        res.write("NodeJS");
        res.write("<form action='/create-user' method='POST'><input type='text' name='user_name'><button type='submit'>Create User</button></form>");
        res.write("</body>");
        res.write("</html>");
        return res.end();
    }
    else if (url === "/users") {
        res.write("<html>");
        res.write("<ul>");
        res.write("<li>John</li>");
        res.write("<li>Kim</li>");
        res.write("<li>Melisa</li>");
        res.write("</ul>");
        res.write("</html>");
        return res.end();
    }
    else if (url === "/create-user" && method === "POST") {
        const body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            const userName = Buffer.concat(body).toString();
            fs.appendFile("username.txt", userName.split('=')[1] + "\n", (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
}

module.exports.requestHandler = handleRequest
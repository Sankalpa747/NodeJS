const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const homeRoutes = require("./routes/home");
const usersRoutes = require("./routes/users");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use(homeRoutes);
app.use(usersRoutes);

app.listen(3000);
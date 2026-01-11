// Imports
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
// Importing routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
// Importing the 404 controller
const errorController = require("./controllers/error");
// Importing the database pool
const sequelize = require("./util/database");
// Importing the models
const Product = require("./models/product");
const User = require("./models/user");

// Create an express application
const app = express();

// App set() allows us to set global configuration for the express application
// Another way of sharing data in the application
// Can share any value such as example:- app.set("title", "My App") / app.set("view engine", "pug");
app.set("view engine", "ejs");
// Set the views directory
app.set("views", "views");
// Parse the body of the request
app.use(bodyParser.urlencoded({extended: false}));
// Serve static files from the public directory (Allows us to access the css files in the public directory from the views directory)
app.use(express.static(path.join(__dirname, "public")));

// Admin and shop routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);
// 404 middleware
app.use(errorController.get404);

// Define the relationships between the models
// onDelete: 'CASCADE' - The product will be deleted if the user is deleted
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);

// Sync the models with the database
// Tables will be created if they do not exist
// sequelize.sync({ force: true }).then(result => { --> Use this to drop the tables and create them again
sequelize.sync({ force: true }).then(result => {
    return User.findByPk(1);
}).then(user => {
    if (!user) {
        return User.create({ name: 'Sankalpa', email: 'sankalpa@test.com', password: '123456' });
    }
    //return Promise.resolve(user); --> Alternative way to return the user
    return user;
}).then(user =>{
    // Start the server
    app.listen(3000);
}).catch(err => {
    console.log(err);
});
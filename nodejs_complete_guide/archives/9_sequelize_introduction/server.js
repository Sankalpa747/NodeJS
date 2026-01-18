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
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

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

// Middleware to find the user and pass it to the routes
app.use((req, res, next) => {
    console.log("User middleware - find the user and pass it to the routes");
    User.findByPk(1).then(user => {
        console.log("User middleware - user found", user);
        req.user = user;
        next();
    }).catch(err => {
        console.log(err);
    });
});

// Admin and shop routes
app.use("/admin", adminRoutes);
app.use(shopRoutes);
// 404 middleware
app.use(errorController.get404);

// Define the relationships between the models
// onDelete: 'CASCADE' - The product will be deleted if the user is deleted
// This association adds methods like user.createProduct() and user.getProducts()
// Many to one relationship
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// One to many relationship
User.hasMany(Product);
// One to one relationship
User.hasOne(Cart);
// One to one relationship
Cart.belongsTo(User);
// "through: CartItem" - This is the intermediate table between the Cart and Product models
// "through" can be only applied for many to many relationships
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
// USER-ORDER-ORDER_ITEM Relationship
// One to many relationship
User.hasMany(Order);
// Many to one relationship
Order.belongsTo(User);
// "through: OrderItem" - This is the intermediate table between the Order and Product models
// "through" can be only applied for many to many 
Product.belongsToMany(Order, { through: OrderItem });
Order.belongsToMany(Product, { through: OrderItem });

// Sync the models with the database
// Tables will be created if they do not exist
// sequelize.sync({ force: true }).then(result => { --> Use this to drop the tables and create them again
sequelize.sync().then(result => {
    return User.findByPk(1);
}).then(user => {
    if (!user) {
        return User.create({ name: 'Sankalpa', email: 'sankalpa@test.com', password: '123456' });
    }
    //return Promise.resolve(user); --> Alternative way to return the user
    return user;
}).then(user =>{
    // Create a cart for the user
    return user.createCart();
}).then(cart => {
    // Start the server
    app.listen(3000);
})
.catch(err => {
    console.log(err);
});
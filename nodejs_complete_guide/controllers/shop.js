// Importing the Product model
const Product = require("../models/product");
const Cart = require("../models/cart");

/**
 * Get the products page
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
exports.getProducts = (req, res, next) => {
    console.log("Product controller - getProducts");
    Product.findAll().then(result => {
        res.render("shop/product-list", {
            prods: result,
            pageTitle: "All Products",
            path: "/products",
        });
    }).catch(err => {
        console.log(err);
    });
}

/**
 * Get the product by id page
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    console.log("Product controller - getProduct, productId: ", productId);
    // GET PRODUCT BY ID
    // Product.findAll({ where: { id: req.params.productId } }).then(products => {
    //     res.render("shop/product-detail", {
    //         product: products[0],
    //         pageTitle: products[0].title,
    //         path: "/products",
    //     });
    // }).catch(err => {
    //     console.log(err);
    // });

    Product.findByPk(productId).then(product => {   
        res.render("shop/product-detail", {
            product: product,
            pageTitle: product.title,
            path: "/products",
        });
    }).catch(err => {
        console.log(err);
    });
}

/**
 * Get the index page
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
exports.getIndex = (req, res, next) => {
    // Fetch all products
    Product.findAll().then(products => {
        // Render the index page
        res.render("shop/index", { 
            prods: products, 
            pageTitle: "Shop Index", 
            path: "/", 
        });
    }).catch(err => {
        console.log(err);
    });
}

/**
 * Get the cart page
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
exports.getCart = (req, res, next) => {
    // Get the cart from the file
    Cart.getCart((cart) => {
        // If the cart is not found, redirect to the home page
        if (!cart) {
            return res.redirect("/");
        }

        // Fetch all products
        Product.fetchAll((products) => {

            // Create an array to store the cart products
            const cartProducts = [];

            for (const product of products) {
                // Find the product in the cart
                const cartProductData = cart.products.find((prod) => prod.id === product.id);
                if (cartProductData) {
                    // Add the product to the cart products array
                    cartProducts.push({ productData: product, qty: cartProductData.qty });
                }
            }
            
            res.render("shop/cart", {
                pageTitle: "Your Cart",
                path: "/cart",
                products: cartProducts,
            });
        });
    });
}

/**
 * Post the add to cart page
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
exports.postCart = (req, res, next) => {
    console.log("Product controller - postCart")
    const productId = req.body.productId;
    const price = req.body.price;

    // Add the product to the cart
    Cart.addProduct(productId, price);

    // Redirect to the cart page
    res.redirect("/cart");
}

/**
 * Post the delete item from cart page
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
exports.postCartDeleteProduct = (req, res, next) => {
    console.log("Product controller - postCartDeleteProduct")
    const productId = req.body.productId;

    // Fetch the product price
    Product.findById(productId, (product) => {
        // If the product is not found, redirect to the home page
        Cart.deleteProduct(productId, product.price);

        // Redirect to the cart page
        res.redirect("/cart");
    });
}

/**
 * Get the checkout page
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
exports.getCheckout = (req, res, next) => {
    res.render("shop/checkout", {
        pageTitle: "Checkout",
        path: "/checkout",
    });
}

/**
 * Get the orders page
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
exports.getOrders = (req, res, next) => {
    res.render("shop/orders", {
        pageTitle: "Your Orders",
        path: "/orders",
    });
}
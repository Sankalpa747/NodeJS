// Importing the Product model
const Product = require("../models/product");
const Cart = require("../models/cart");
const Order = require("../models/order");

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
    req.user.getCart().then(cart => {
        return cart.getProducts();
    }).then(products => {
        res.render("shop/cart", {
            pageTitle: "Your Cart",
            path: "/cart",
            products: products,
        });
    }).catch(err => {
        console.log(err);
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
    let fetchedCart;
    let newQuantity = 1;

    // Get the cart from the user
    req.user.getCart().then(cart => {
        fetchedCart = cart;
        return cart.getProducts({ where: { id: productId } });
    }).then(products => {
        let product;
        if (products.length > 0) {
            product = products[0];
        }

        if (product) {
            // Existing product, update the quantity
            const oldQuantity = product.cartItem.quantity;
            newQuantity = oldQuantity + 1;
            return product;
        }

        // No existing product, create a new one
        return Product.findByPk(productId)
    }).then(product => {
        // Add the product to the cart
        // This will create or update the intermediate table CartItem with the quantity
        return fetchedCart.addProduct(product, { through: { quantity: newQuantity } });
    }).then(() => {
        // Redirect to the cart page
        res.redirect("/cart");
    }).catch(err => {
        console.log(err);
    });
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

    // // Get the cart from the user
    // req.user.getCart().then(cart => {   
    //     cart.removeProduct(productId);
    // }).then(result => {
    //     res.redirect("/cart");
    // }).catch(err => {
    //     console.log(err);
    // });

    // Get the cart from the user
    req.user.getCart().then(cart => { 
        return cart.getProducts({ where: { id: productId } });
    }).then( products => {
        const product = products[0];
        product.cartItem.destroy();
    }).then(result => {
        res.redirect("/cart");
    }).catch(err => {
        console.log(err);
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
 * Post the order page
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
exports.postOrder = (req, res, next) => {
    console.log("Product controller - postOrder")
    let fetchedProducts;

    req.user.getCart().then(cart => {
        return cart.getProducts();
    }).then(products => {
        if (!products || products.length === 0) {
            return res.redirect("/cart");
        }
        fetchedProducts = products;
        console.log("Fetched products from cart:", fetchedProducts.length);

        // Create a new order for the user
        return req.user.createOrder();
    }).then(order => {
        if (!order || !order.id) {
            throw new Error("Order was not created successfully");
        }
        console.log("Order created with ID:", order.id);

        // Use Promise.all with map to wait for all async operations
        return Promise.all(
            fetchedProducts.map(product => {
                const quantity = product.cartItem.quantity;
                console.log("Adding product to order - Product ID:", product.id, "Quantity:", quantity, "Order ID:", order.id);
                return order.addProduct(product, { through: { quantity: quantity } }).then(() => {
                    console.log("Product", product.id, "added to order", order.id, ", destroying cartItem");
                    return product.cartItem.destroy();
                });
            })
        );
    }).then(() => {
        console.log("Order creation completed successfully");
        res.redirect("/orders");
    }).catch(err => {
        console.error("Error creating order:", err);
        console.error("Error details:", JSON.stringify(err, null, 2));
        if (err.stack) {
            console.error("Error stack:", err.stack);
        }
        res.redirect("/cart");
    });
}

/**
 * Get the orders page
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
exports.getOrders = (req, res, next) => {
    console.log("Product controller - getOrders")
    // Eager loading - Load the products with the orders
    // Which means we can access the products directly from the orders (Thanks to associations)
    req.user.getOrders({ include: ['products'] })
    .then(orders => {
        res.render("shop/orders", {
            pageTitle: "Your Orders",
            path: "/orders",
            orders: orders,
        });
    }).catch(err => {
        console.log(err);
    });
}
// Imports
const fs = require("fs");
const path = require("path");

// Get the path to the cart file
const p = path.join(path.dirname(require.main.filename), "data", "cart.json");

module.exports = class Cart {

    /**
     * Add a product to the cart
     * @param {string} id - The id of the product
     * @param {number} productPrice - The price of the product
     * @returns {void}
     */
    static addProduct(id, productPrice) {
        // Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            // Initialize the cart if it doesn't exist
            let cart = { products: [], totalPrice: 0 };
            if (!err && fileContent && fileContent.toString().trim()) {
                try {
                    cart = JSON.parse(fileContent);
                } catch (parseErr) {
                    // If parsing fails, use the default empty cart
                    console.log('Error parsing cart file:', parseErr);
                }
            }

            // Find the product in the cart
            const existingProductIndex = cart.products.findIndex((prod) => prod.id === id);
            // Get the existing product
            const existingProduct = cart.products[existingProductIndex];

            // Update the product quantity
            let updatedProduct;

            if (existingProduct) {
                // Using spread operator to create a new object with the existing product properties
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                
                // Create a new array with the updated product
                cart.products = [...cart.products];
                // Replace the existing product with the updated product
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }

            // Convert the product price to a number and add it to the total price (Adding the + to convert the string to a number)
            cart.totalPrice = cart.totalPrice + +productPrice;

            // Write the cart to the file
            fs.writeFile(p, JSON.stringify(cart), (err) => { 
                console.log(err); 
            });
        });
    }
};
// Imports
const fs = require("fs");
const path = require("path");
const Cart = require("./cart");

// Get the path to the products file
const p = path.join(path.dirname(require.main.filename), "data", "products.json");

/**
 * Get the products from the file
 * @param {Function} callback - The callback function
 * @returns {void}
 */
const getProductsFromFile = (callback) => {
    // Read the file
    fs.readFile(p, (err, fileContent) => {
        if (err || fileContent.length === 0) {
            callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
    });
}

/**
 * Product model
 */
module.exports = class Product {

    /**
     * Constructor
     * @param {string} id - The id of the product
     * @param {string} title - The title of the product
     * @param {string} imageUrl - The image url of the product
     * @param {string} description - The description of the product
     * @param {number} price - The price of the product
     */
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    /**
     * Save the product
     * @returns {void}
     */
    save() {
        getProductsFromFile((products) => {
            if (this.id) {
                // Update the product
                const existingProductIndex = products.findIndex((p) => p.id === this.id);

                const updatedProducts = [...products];

                updatedProducts[existingProductIndex] = this;

                // Write the file
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
            } else {
                // Generate a new id if the product is new
                this.id = Math.random().toString();

                // Add the product to the products array
                products.push(this);

                // Write the file
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        });
    }

    /**
     * Fetch all products
     * @param {Function} callback - The callback function
     * @returns {Array} - The products
     */
    static fetchAll(callback) {
        // Get the products from the file
        getProductsFromFile(callback);
    }

    /**
     * Find a product by id
     * @param {string} id - The id of the product
     * @param {Function} callback - The callback function
     * @returns {void}
     */
    static findById(id, callback) {
        getProductsFromFile((products) => {
            const product = products.find((p) => p.id === id);
            callback(product);
        });
    }

    /**
     * Delete a product by id
     * @param {string} id - The id of the product
     * @param {Function} callback - The callback function
     * @returns {void}
     */
    static deleteById(id, callback) {
        getProductsFromFile((products) => {
            // Find the product by id
            const product = products.find((p) => p.id === id);

            // Filter out the product by id
            const updatedProducts = products.filter((p) => p.id !== id);

            // Write the file
            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                if (!err) {
                    Cart.deleteProduct(id, product.price);
                }

            });

            // Callback the updated products
            callback();
        });
    }   
}
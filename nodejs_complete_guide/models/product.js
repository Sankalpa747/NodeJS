// Imports
const fs = require("fs");
const path = require("path");

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
     * @param {string} title - The title of the product
     * @param {string} imageUrl - The image url of the product
     * @param {string} description - The description of the product
     * @param {number} price - The price of the product
     */
    constructor(title, imageUrl, description, price) {
        this.id = Math.random().toString();
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
            // Add the product to the products array
            products.push(this);

            // Write the file
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
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
}
// Imports
const fs = require("fs");
const path = require("path");

// Get the path to the products file
const p = path.join(path.dirname(require.main.filename), 
"data", 
"products.json");

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
     */
    constructor(title, imageUrl, description, price) {
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
}
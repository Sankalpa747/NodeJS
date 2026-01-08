// Imports
const db = require("../util/database");
const Cart = require("./cart");

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
        return db.execute("INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)", 
            [this.title, this.price, this.imageUrl, this.description]);
    }

    /**
     * Fetch all products
     * @returns {Array} - The products
     */
    static fetchAll() {
        return db.execute("SELECT * FROM products");
    }

    /**
     * Find a product by id
     * @param {string} id - The id of the product
     * @returns {void}
     */
    static findById(id) {
        return db.execute("SELECT * FROM products WHERE id = ?", [id]);
    }

    /**
     * Delete a product by id
     * @param {string} id - The id of the product
     * @returns {void}
     */
    static deleteById(id) {

    }   
}
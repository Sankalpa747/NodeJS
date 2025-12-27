/**
 * Get the 404 page
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function
 */
exports.get404 = (req, res, next) => {
    console.log("404 controller - get404");
    // Render the page-not-found.pug file
    res.status(404).render("page-not-found", { docTitle: "Page Not Found", path: "/404" });
}
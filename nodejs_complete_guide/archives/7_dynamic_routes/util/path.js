// Importing path module (To get the directory name of the current file)
const path = require("path");

// Export the directory name of the current file
module.exports = path.dirname(require.main.filename);
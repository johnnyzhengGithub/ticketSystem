const path = require('path');

module.exports = {
    entry: './server.js', // Ensure this points to the correct location of server.js
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    target: 'node', // Set target to node for server-side code
};

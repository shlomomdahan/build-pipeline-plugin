const path = require('path');

module.exports = {
    entry: './src/main/webapp/templates/index.js',
    module: {
        rules: [
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
            }
        ]
    },
    output: {
        filename: 'templates-bundle.js',
        path: path.resolve(__dirname, 'src/main/webapp/js'),
    }
};

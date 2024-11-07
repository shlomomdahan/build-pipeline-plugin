const path = require('path');

module.exports = {
    entry: './src/main/webapp/templates/index.js',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader',
                options: {
                    recompileOptions: {
                        knownHelpersOnly: false,
                        strict: false,
                    },
                },
            }
        ]
    },
    output: {
        filename: 'templates-bundle.js',
        path: path.resolve(__dirname, 'src/main/webapp/js'),
    }
};

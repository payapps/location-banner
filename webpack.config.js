const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = env => {
  console.log('Production: ', env.production);
  return {
    "mode": "none",
    "entry": "./src/index.js",
    "output": {
     "path": __dirname + '/dist',
     "filename": "bundle.js"
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
    plugins: [new HtmlWebpackPlugin()],
    devServer: {
      contentBase: path.join(__dirname, 'dist')
    },
    ...(!env.production && { devtool: 'eval-source-map' }),
    "module": {
       "rules": [
         {
           "test": /\.css$/,
           "use": [
             "style-loader",
             "css-loader"
           ]
         },
         {
          "test": /\.js$/,
           "exclude": /node_modules/,
           "use": {
             "loader": "babel-loader",
             "options": {
               "presets": [
                 "@babel/preset-env",
               ]
             }
           }
         }
       ]
     }
  }
}

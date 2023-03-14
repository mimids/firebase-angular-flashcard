const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const assets = [ 'avatar','img', 'icons', 'fonts' ]; // asset directories

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  plugins: assets.map(asset => {
    return new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src', asset),
        to: path.resolve(__dirname, '.webpack/renderer', asset)
      }
    ]);
  })
};
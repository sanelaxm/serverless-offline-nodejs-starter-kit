const path = require( 'path' );
const slsw = require( 'serverless-webpack' ) ;
const nodeExternals = require( 'webpack-node-externals' );

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',

  // Since 'aws-sdk' is not compatible with webpack, exclude node dependencies
  externals: [ nodeExternals() ],

  // Run babel on all .js files and skip those in node_modules
  output: {
    libraryTarget: 'commonjs',
    path: path.join( __dirname, '.webpack' ),
    filename: '[name].js'
  },
  module: {
    rules: [ {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [ { loader: 'babel-loader' } ]
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'
    } ]
  }
};

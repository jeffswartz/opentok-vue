const webpack = require('webpack');
const config = require('./config/config.js');
const Log = require('log')
const log = new Log('info');
console.log('preparing email' + JSON.stringify(config));
const OpenTok = require('opentok');

const opentok = new OpenTok(config.OT_API_KEY, config.OT_API_SECRET);

module.exports = {
  entry: {
    index: './src/index.js',
  },
  output: {
    path: './js/',
    filename: 'index.js',
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      config: {
        OT_API_KEY: config.OT_API_KEY,
        OT_SESSION_ID: '"' + config.OT_SESSION_ID + '"',
        OT_TOKEN: JSON.stringify(opentok.generateToken(config.OT_SESSION_ID)),
      },
    }),
  ],
};

const { addWebpackModuleRule } = require('customize-cra');

module.exports = function override(config, env) {
  // Add null-loader for specific files
  config = addWebpackModuleRule({
    test: /\.css$/, // Example: ignore CSS imports
    use: ['null-loader'],
  })(config);

  return config;
};

const path = require('path');
const os=require('os');
const crypto=require('crypto');
module.exports = {
    webpack: (config) => {
      config.resolve.fallback = {
        "path": false,
        "os": false,
        "crypto": false
      };
      return config;
    }
  };  

module.exports = {
  webpack: (config) => {
    config.resolve.fallback = {
      "buffer": require.resolve("buffer"),
      "stream": require.resolve("stream-browserify")
    };
    return config;
  }
};

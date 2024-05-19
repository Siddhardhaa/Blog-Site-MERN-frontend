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
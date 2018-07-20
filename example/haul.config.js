var path = require("path");

module.exports = ({ platform }, defaults) => {
  return {
    entry: `./index.js`,
    devtool: "source-map",
    resolve: {
      ...defaults.resolve,
      alias: {
        "react-native": path.resolve(__dirname, "node_modules/react-native"),
        react: path.resolve(__dirname, "node_modules/react")
      }
    }
  };
};

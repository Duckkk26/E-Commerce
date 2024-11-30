module.exports = {
  presets: [["@babel/preset-env", { modules: false }]],
  plugins: [
    "@babel/plugin-proposal-object-rest-spread", // Enables the spread operator in objects
  ],
  sourceType: "module",
};

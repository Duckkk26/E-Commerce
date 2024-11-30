module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react", // If you're using React
  ],
  plugins: [
    "@babel/plugin-proposal-object-rest-spread", // Enables the spread operator in objects
  ],
  sourceType: "module",
};

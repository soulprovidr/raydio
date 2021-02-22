module.exports = {
  "*.{ts}": [
    "tsc -noEmit",
    "eslint --fix",
    "prettier --write",
    "jest --bail --findRelatedTests",
  ],
  "*.{json}": "prettier --write",
};

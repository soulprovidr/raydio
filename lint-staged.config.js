module.exports = {
  "!*.js": [
    "tsc -noEmit",
    "eslint --fix",
    "prettier --write",
    "jest --bail --findRelatedTests",
  ],
};

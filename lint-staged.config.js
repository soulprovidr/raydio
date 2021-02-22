module.exports = {
  "*.{js,ts}": ["tsc -noEmit -p .", "eslint --fix", "prettier --write"],
  "*.{json}": "prettier --write",
};

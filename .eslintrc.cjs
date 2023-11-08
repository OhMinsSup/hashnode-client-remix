/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [
    "@remix-run/eslint-config",
    "@remix-run/eslint-config/node",
    "prettier",
  ],
  rules: {
    "react/display-name": "off",
    "no-useless-constructor": "off",
  },
};

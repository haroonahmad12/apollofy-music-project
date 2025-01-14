// "off" or 0 - turn the rule off
// "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
// "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)
module.exports = {
  parser: "babel-eslint",
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
    // "plugin:jest/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:jsx-a11y/recommended",
    "prettier",
    "react-app",
  ],
  plugins: ["html", "jsx-a11y", "react", "markdown", "react-hooks", "import"],
  settings: {
    react: {
      version: "detect",
    },
  },
  parserOptions: {
    sourceType: "module",
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    // "jest/globals": true,
  },
  rules: {
    "no-undef": "off",
    "prefer-template": "off",
    "no-shadow": "off",
    "spaced-comment": "off",
    "prefer-promise-reject-errors": "off",
    "prefer-arrow-callback": "off",
    "import/order": "off",
    "react/jsx-filename-extension": "off",
    "import/prefer-default-export": "off",
    "prefer-destructuring": "off",
    "object-shorthand": "off",
    "react/jsx-props-no-spreading": "off",
    "arrow-body-style": "off",
    "no-underscore-dangle": "off",
    "react/forbid-prop-types": "off",
    "jsx-a11y/label-has-associated-control": [
      "error",
      {
        assert: "htmlFor",
      },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["tailwind.config.js", "craco.config.js"] },
    ],
  },
};

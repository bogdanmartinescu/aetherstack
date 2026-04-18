const { resolve } = require("node:path")

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    require.resolve("./index.js"),
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
  ],
  parserOptions: {
    project: resolve(process.cwd(), "tsconfig.json"),
  },
  plugins: ["react", "react-hooks"],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
  },
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    browser: true,
  },
}

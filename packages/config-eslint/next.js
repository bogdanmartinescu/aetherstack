const { resolve } = require("node:path")

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    require.resolve("./index.js"),
    "next/core-web-vitals",
    "next/typescript",
  ],
  parserOptions: {
    project: resolve(process.cwd(), "tsconfig.json"),
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
  },
}

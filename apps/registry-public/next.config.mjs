/** @type {import('next').NextConfig} */
const config = {
  output: "export",
  trailingSlash: true,
  transpilePackages: ["@aetherstack/registry-schema"],
}

export default config

/** @type {import('next').NextConfig} */
const config = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  transpilePackages: [
    "@aetherstack/ui",
    "@aetherstack/patterns",
    "@aetherstack/blocks",
    "@aetherstack/tokens",
    "@aetherstack/utils",
    "@aetherstack/icons",
  ],
}

export default config

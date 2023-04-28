/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    serverRuntimeConfig: {
        PROJECT_ROOT: __dirname,
    },
    pageExtensions: ["mdx", "md", "jsx", "js", "tsx", "ts"],
};

module.exports = nextConfig;

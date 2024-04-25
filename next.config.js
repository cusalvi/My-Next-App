const withPWA = require('next-pwa')({
  dest: 'public'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'm.media-amazon.com',
            port: '',
            pathname: '/images/**',
          },
        ],
    },
    publicRuntimeConfig: {
      // Will be available on both server and client
      CONTENTSTACK_API_KEY: process.env.CONTENTSTACK_API_KEY,
      CONTENTSTACK_DELIVERY_TOKEN: process.env.CONTENTSTACK_DELIVERY_TOKEN,
      CONTENTSTACK_BRANCH: process.env.CONTENTSTACK_BRANCH || 'main',
      CONTENTSTACK_REGION:process.env.CONTENTSTACK_REGION || "us",
      CONTENTSTACK_ENVIRONMENT: process.env.CONTENTSTACK_ENVIRONMENT,
      CONTENTSTACK_MANAGEMENT_TOKEN: process.env.CONTENTSTACK_MANAGEMENT_TOKEN,
      CONTENTSTACK_API_HOST:
        process.env.CONTENTSTACK_API_HOST || 'api.contentstack.io',
      CONTENTSTACK_APP_HOST:
        process.env.CONTENTSTACK_APP_HOST || 'app.contentstack.com',
      CONTENTSTACK_LIVE_PREVIEW:
        process.env.CONTENTSTACK_LIVE_PREVIEW || 'true',
      CONTENTSTACK_LIVE_EDIT_TAGS:
        process.env.CONTENTSTACK_LIVE_EDIT_TAGS || 'false',
    }
}
  
// module.exports = nextConfig


module.exports =
  process.env.NODE_ENV === 'development' ? nextConfig : withPWA(nextConfig);

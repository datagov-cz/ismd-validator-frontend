import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/validujeme',
  publicRuntimeConfig: {
    backendUrl: process.env.NEXT_PUBLIC_BE_URL || 'localhost:8080',
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

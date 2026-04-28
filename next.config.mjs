import createNextIntlPlugin from 'next-intl/plugin';

const beUrl = process.env.BE_URL || 'http://localhost:8080/validujeme';

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/validujeme',

  async rewrites() {
    return [
      // API proxy — Next.js forwards all /api/* requests to the backend server-side.
      // The backend has internal ingress only; it is never reachable from the browser.
      { source: '/api', destination: `${beUrl}/api` },
      { source: '/api/:path*', destination: `${beUrl}/api/:path*` },

      // OpenAPI spec — served at the springdoc default path.
      { source: '/v3/api-docs', destination: `${beUrl}/v3/api-docs` },
      { source: '/v3/api-docs/:path*', destination: `${beUrl}/v3/api-docs/:path*` },

      // Swagger UI assets — proxied to the backend's springdoc-served /swagger-ui/ tree.
      // The user-facing URL is /api-docs (a Next.js page that embeds this in an iframe).
      { source: '/swagger-ui/:path*', destination: `${beUrl}/swagger-ui/:path*` },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

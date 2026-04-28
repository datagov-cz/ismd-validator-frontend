import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '/validujeme',

  async rewrites() {
    return [
      // Swagger / OpenAPI paths route through /api/backend so the proxy can
      // strip Spring Boot's X-Frame-Options: DENY (would otherwise block the
      // iframe) and so BE_URL is resolved at request time, not build time.
      { source: '/v3/api-docs', destination: '/api/backend/v3/api-docs' },
      {
        source: '/v3/api-docs/:path*',
        destination: '/api/backend/v3/api-docs/:path*',
      },
      {
        source: '/swagger-ui/:path*',
        destination: '/api/backend/swagger-ui/:path*',
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

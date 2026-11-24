### Build stage
FROM node:24-alpine AS build
WORKDIR /app

# Set environment variable
ARG NODE_ENV=production

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci

# Copy the source code, excluding some things unnecessary for the build, see .dockerignore
COPY . .

# Build the application
ENV NODE_ENV=${NODE_ENV}
RUN npm run build

### Runtime stage
FROM node:24-alpine AS runtime
WORKDIR /app

# Set environment variables
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Copy package files
COPY --from=build /app/package.json ./
COPY --from=build /app/package-lock.json ./

# Install dependencies, clean, only production ready
RUN npm ci --omit=dev

# Copy the built application. Everything stays root-owned and read-only except
# .next, which Next.js writes to at runtime (.next/cache, image optimisation).
COPY --from=build --chown=node:node /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.mjs ./
COPY --from=build /app/messages ./messages

# Run as the unprivileged `node` user (uid 1000) shipped with the base image
USER node

EXPOSE 3000

CMD ["npm", "start"]

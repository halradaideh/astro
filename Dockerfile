# Use Node.js LTS version for development
FROM node:20-alpine

# Install wget for health checks and git for npm prepare script
RUN apk add --no-cache wget git

# Set working directory
WORKDIR /app

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S astro -u 1001

# Copy package files first for better Docker layer caching
COPY package*.json ./

# Initialize git repo for git hooks (npm prepare script)
RUN git init

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Create .env from development template if it doesn't exist
RUN if [ ! -f .env ]; then npm run setup-env:dev; fi

# Change ownership to the nodejs user
RUN chown -R astro:nodejs /app
USER astro

# Expose the development port
EXPOSE 4321

# Health check to ensure the server is running
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4321/ || exit 1

# Start the development server with host binding for Docker
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"] 
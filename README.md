# Hamdan Radaideh's Tech Blog

<div align="center">
  <img src="public/profile-banner.jpg" alt="Hamdan Radaideh - DevOps & SRE" width="100%" style="border-radius: 10px;">
</div>

[![Site Status](https://img.shields.io/website?url=https%3A%2F%2Fblog.radaideh.info)](https://blog.radiadeh.info)
[![Built with Astro](https://img.shields.io/badge/Built%20with-Astro-FF5D01.svg)](https://astro.build)
[![Powered by Claude](https://img.shields.io/badge/Powered%20by-Claude%20AI-7C3AED.svg)](https://anthropic.com)

Welcome to my personal tech blog where I share insights and experiences in DevOps, Site Reliability Engineering, and cloud infrastructure. As a Principal SRE at Atypon (Wiley), I focus on building and maintaining robust, scalable systems.

## 🔒 Focus Areas

- 🛡️ Infrastructure Security & Automation
- 🚀 Cloud-Native Technologies
- 🔄 CI/CD Pipeline Design
- 📊 System Monitoring & Observability
- 🎯 Performance Optimization
- 🔐 Security Best Practices

## 🌐 Connect With Me

- [GitHub](https://github.com/halradaideh)
- [LinkedIn](https://www.linkedin.com/in/hamdan-a-radaideh/)
- [Blog](https://blog.radiadeh.info)

## 💻 Tech Stack

This blog is built with modern technologies:

- ⚡ Astro for static site generation
- 🎨 Modern, responsive design
- 💬 Giscus for comments (powered by GitHub Discussions)
- 📱 Mobile-first approach
- 🔍 SEO optimized
- 📰 RSS feed support

## 🚀 Quick Start

### For New Developers (Recommended)

```bash
git clone https://github.com/halradaideh/astro.git
cd astro
npm install
npm run setup-env:dev    # One-command environment setup
npm run dev              # Start developing!
```

The development setup automatically configures all required environment variables with safe development values.

### Using Docker (Alternative)

For a completely isolated development environment:

```bash
git clone https://github.com/halradaideh/astro.git
cd astro
npm run dev:docker       # Build and run in Docker with live reloading
```

This approach ensures consistent development environment across different machines and operating systems.

### For Production Deployment

```bash
git clone https://github.com/halradaideh/astro.git
cd astro
npm install
npm run setup-env:prod   # Create production template
# Edit .env with your real values
npm run validate-env     # Verify configuration
npm run build           # Deploy!
```

## 🔧 Environment Management

This project uses a unified environment setup system that eliminates hardcoded configurations and enforces DRY principles.

### Environment Commands

```bash
# Quick development setup (recommended for new developers)
npm run setup-env:dev      # Creates .env with development-safe values

# Production template setup
npm run setup-env:prod     # Creates .env from template for production

# Validation and management
npm run validate-env       # Validate current environment configuration
npm run setup-env          # Smart setup: validates existing or creates new
npm run setup-env help     # Show all available options
```

### Environment Features

- **🔒 Strict Validation**: No fallbacks - fails fast if variables are missing
- **🚀 Development Ready**: One-command setup with safe development values
- **🔄 Backup System**: Automatically backs up existing .env files
- **📋 Clear Guidance**: Helpful error messages and setup instructions
- **🎯 DRY Principle**: Single source of truth for all configurations

### Required Environment Variables

| Variable                  | Description                    | Development Default          | Production   |
| ------------------------- | ------------------------------ | ---------------------------- | ------------ |
| `SITE_URL`                | Production site URL            | `https://blog.radaideh.info` | **Required** |
| `DEV_URL`                 | Development server URL         | `http://localhost:4321`      | **Required** |
| `DEV_PORT`                | Development server port        | `4321`                       | **Required** |
| `GISCUS_REPO`             | GitHub repository for comments | `halradaideh/astro`          | **Required** |
| `GISCUS_REPO_ID`          | Giscus repository ID           | Real ID                      | **Required** |
| `GISCUS_CATEGORY`         | Giscus discussion category     | `General`                    | **Required** |
| `GISCUS_CATEGORY_ID`      | Giscus category ID             | Real ID                      | **Required** |
| `CLOUDFLARE_API_TOKEN`    | Cloudflare API token           | Dev-safe placeholder         | **Required** |
| `CLOUDFLARE_ACCOUNT_ID`   | Cloudflare account ID          | Dev-safe placeholder         | **Required** |
| `RATE_LIMIT_REQUESTS`     | Rate limit per window          | `60`                         | **Required** |
| `RATE_LIMIT_WINDOW`       | Rate limit window (seconds)    | `60`                         | **Required** |
| `SESSION_SECRET`          | Session secret key             | Dev-safe string              | **Required** |
| `ENABLE_SECURITY_HEADERS` | Enable security headers        | `true`                       | **Required** |
| `MAX_REQUEST_SIZE`        | Maximum request size           | `10mb`                       | **Required** |
| `ALLOWED_UPLOAD_TYPES`    | Allowed upload types           | Image types                  | **Required** |

## 🛠️ Development

### Prerequisites

1. **Node.js** (latest LTS version)
2. **npm** (comes with Node.js)
3. **Git** for version control
4. **Docker** (optional, for containerized development)

### Docker Development

The project includes Docker support for a consistent, isolated development environment:

#### Benefits:

- **Environment Consistency**: Same Node.js version across all machines
- **No Local Dependencies**: No need to install Node.js locally
- **Isolation**: Prevents conflicts with other projects
- **Easy Cleanup**: Remove container without affecting host system

#### Docker Commands:

```bash
# One-command development (builds and runs)
npm run dev:docker

# Or step by step:
npm run docker:build       # Build the image
npm run docker:run         # Run the container
npm run docker:clean       # Clean up the image

# Access the running container
docker exec -it astro-blog-dev sh
```

#### Features:

- **Live Reloading**: Source code changes reflect immediately
- **Port Mapping**: Accessible at `http://localhost:4321`
- **Volume Mounting**: Real-time file synchronization
- **Health Checks**: Automatic container health monitoring
- **Non-root User**: Secure container execution

### Development Commands

```bash
# Environment setup and validation
npm run setup-env:dev      # Quick development setup
npm run validate-env       # Validate environment configuration

# Development server
npm run dev                # Start development server (includes validation)
npm run dev:docker         # Start development server in Docker container

# Docker commands
npm run docker:build       # Build Docker image
npm run docker:run         # Run existing Docker image
npm run docker:clean       # Remove Docker image

# Building and testing
npm run build              # Build for production
npm run preview            # Preview production build locally
npm run test               # Run Playwright tests
npm run test:ui            # Run tests with UI

# Code quality
npm run lint               # Run ESLint
npm run lint:fix           # Fix ESLint issues automatically
npm run format             # Format code with Prettier
npm run format:check       # Check code formatting
npm run typecheck          # Run TypeScript type checking

# Performance and analysis
npm run lighthouse         # Run Lighthouse performance audit
npm run analyze            # Analyze bundle size
npm run security-audit     # Run security audit
npm run check-deps         # Check for unused dependencies
npm run update-deps        # Update dependencies
```

### Project Structure

```
astro/
├── scripts/               # Build and setup scripts
│   └── setup-env.js      # Unified environment management
├── src/                  # Source code
│   ├── components/       # Astro/React components
│   ├── content/          # Blog posts and content
│   ├── layouts/          # Page layouts
│   ├── pages/            # Route pages
│   └── styles/           # CSS styles
├── functions/            # Cloudflare Pages Functions
├── public/               # Static assets
├── tests/                # E2E tests
├── .github/              # GitHub workflows and templates
├── env.example           # Environment template
└── package.json          # Dependencies and scripts
```

### CI/CD Pipeline

The project includes a comprehensive CI/CD pipeline with:

- **Quality Checks**: ESLint, Prettier, TypeScript validation
- **Testing**: Playwright E2E tests
- **Security Scanning**: Trivy vulnerability scanner
- **Performance Testing**: Lighthouse CI with budgets
- **Build Verification**: Automated build testing
- **Deployment**: Automated deployment to Cloudflare Pages
- **Dependency Management**: Automated dependency updates

## 📝 Latest Articles

- [DDoS Protection with Cloudflare: From Basic to Advanced](/blog/ddos-protection-with-cloudflare)
- [Automated Proxmox Deployment with PXE and Preseed](/blog/pxe-preseed-proxmox)
- [Dynamic DNS with PowerDNS: A Complete Guide](/blog/ddns-with-powerdns)

## 🤖 AI Assistant

This blog's design and structure were created with the assistance of Claude AI, Anthropic's advanced language model. The AI helped in:

- Designing the modern, responsive layout
- Implementing cybersecurity-themed components
- Optimizing the site structure
- Creating engaging technical content
- Building the unified environment management system

## 📄 License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International License**.

### You are free to:

- ✅ **Personal Use**: Use this code for your personal blog or portfolio
- ✅ **Educational Use**: Learn from and modify the code
- ✅ **Share**: Copy and redistribute the code
- ✅ **Adapt**: Remix, transform, and build upon the code

### Under the following terms:

- 📝 **Attribution**: You must give appropriate credit and link to this repository
- 🚫 **Non-Commercial**: You may not use this for commercial purposes

### Commercial Use

For commercial licensing, please contact [Hamdan Radaideh](https://github.com/halradaideh) to discuss terms.

**License**: [CC BY-NC-4.0](https://creativecommons.org/licenses/by-nc/4.0/)

## 🔄 Recent Updates

- **Unified Environment System**: Refactored to single script handling setup, validation, and management
- **DRY Principle Enforcement**: Eliminated all hardcoded configurations and fallback values
- **Enhanced Developer Experience**: One-command development setup with automatic validation
- **Improved CI/CD**: Added performance testing, security scanning, and dependency management
- **Repository Organization**: Moved scripts to dedicated directory for cleaner structure
- Fixed Giscus comment system integration issues and improved theme synchronization
- Enhanced error handling for KV operations and improved logging
- Added comprehensive rate limiting and security features

## 🛡️ Security Features

- **Strict Environment Validation**: No fallbacks, fail-fast approach
- **Security Headers**: Comprehensive security header implementation
- **Rate Limiting**: Configurable rate limiting on API endpoints
- **Session Security**: Secure session handling with proper secrets
- **Input Validation**: Request size limits and upload type restrictions
- **CORS Protection**: Properly configured CORS policies
- **Error Handling**: Secure error logging without information disclosure

## 🚀 Deployment

### Cloudflare Pages Setup

1. **Environment Configuration**

   ```bash
   # Create production environment
   npm run setup-env:prod

   # Edit .env with your actual values:
   # - SITE_URL: Your production domain
   # - GISCUS_*: Your GitHub repository settings
   # - CLOUDFLARE_*: Your actual Cloudflare credentials
   # - SESSION_SECRET: A secure random string (32+ chars)

   # Validate configuration
   npm run validate-env
   ```

2. **Build and Deploy**

   ```bash
   npm run build
   npm run deploy
   ```

3. **Required Cloudflare Settings**

   Set these environment variables in your Cloudflare Pages dashboard:

   ```bash
   # Copy all variables from your .env file
   SITE_URL=your_production_url
   GISCUS_REPO=your_repo
   GISCUS_REPO_ID=your_repo_id
   # ... all other variables from .env
   ```

### GitHub Secrets Configuration

For the CI/CD pipeline, configure these secrets in your GitHub repository:

```bash
# Cloudflare Configuration
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
SITE_URL=your_production_url

# Giscus Configuration
GISCUS_REPO=your_repo_name
GISCUS_REPO_ID=your_repo_id
GISCUS_CATEGORY=your_category_name
GISCUS_CATEGORY_ID=your_category_id

# Security
SESSION_SECRET=your_secure_session_secret
```

### Monitoring and Analytics

- **Cloudflare Analytics**: Traffic and performance monitoring
- **Lighthouse CI**: Automated performance budgets
- **Security Scanning**: Vulnerability detection in CI/CD
- **Error Monitoring**: Comprehensive error logging and alerting
- **Health Checks**: API endpoint health monitoring

### Troubleshooting

Common issues and solutions:

1. **Environment Validation Failures**

   ```bash
   npm run validate-env    # Check specific errors
   npm run setup-env:dev   # Reset to development defaults
   npm run setup-env help  # View all available commands
   ```

2. **Development Server Issues**

   ```bash
   # The dev server includes automatic validation
   npm run dev             # Validates before starting

   # If validation fails, check your .env file
   npm run validate-env    # Get detailed error messages
   ```

3. **Deployment Issues**

   ```bash
   # Verify all environment variables are set
   npm run validate-env

   # Check build locally
   npm run build
   npm run preview
   ```

---

<div align="center">
  <sub>Built with ❤️ by Hamdan Radaideh | Powered by Claude AI</sub>
</div>

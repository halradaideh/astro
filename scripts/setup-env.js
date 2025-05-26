#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths relative to the root directory (one level up from scripts/)
const envExamplePath = path.join(__dirname, '..', 'env.example');
const envPath = path.join(__dirname, '..', '.env');

// Add security-related required variables
const SECURITY_VARS = [
  'SESSION_SECRET',
  'ENABLE_SECURITY_HEADERS',
  'MAX_REQUEST_SIZE',
  'ALLOWED_UPLOAD_TYPES',
];

// Required environment variables
const REQUIRED_VARS = [
  'SITE_URL',
  'DEV_URL',
  'DEV_PORT',
  'GISCUS_REPO',
  'GISCUS_REPO_ID',
  'GISCUS_CATEGORY',
  'GISCUS_CATEGORY_ID',
  'CLOUDFLARE_API_TOKEN',
  'CLOUDFLARE_ACCOUNT_ID',
  'RATE_LIMIT_REQUESTS',
  'RATE_LIMIT_WINDOW',
  ...SECURITY_VARS,
];

// Development configuration template
const DEV_ENV_TEMPLATE = `# Site Configuration
SITE_URL="https://blog.radaideh.info"

# Development Configuration
DEV_URL="http://localhost:4321"
DEV_PORT="4321"

# Version (optional - will be set at deploy time)
# GIT_VERSION="0.0.36-dirty"

# Giscus Configuration (Real values from your GitHub setup)
GISCUS_REPO="halradaideh/astro"
GISCUS_REPO_ID="R_kgDOOvejuw"
GISCUS_CATEGORY="General"
GISCUS_CATEGORY_ID="DIC_kwDOOveju84Cqi8P"

# Cloudflare Pages Configuration (Development safe tokens)
CLOUDFLARE_API_TOKEN="dev-cf-token-safe-for-development-testing"
CLOUDFLARE_ACCOUNT_ID="dev-cf-account-id-safe-for-testing"

# Rate Limiting Configuration
RATE_LIMIT_REQUESTS="60"
RATE_LIMIT_WINDOW="60"

# Security Configuration
SESSION_SECRET="development-session-secret-key-for-local-testing-only-minimum-32-characters"
ENABLE_SECURITY_HEADERS="true"
MAX_REQUEST_SIZE="10mb"
ALLOWED_UPLOAD_TYPES="image/jpeg,image/png,image/webp"
`;

function validateEnv() {
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env file not found!');
    return false;
  }

  // Load and parse .env file
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};

  envContent.split('\n').forEach((line) => {
    line = line.trim();
    if (line && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        envVars[key] = valueParts.join('=').replace(/^["']|["']$/g, '');
      }
    }
  });

  // Validate all required variables
  const missing = [];
  const invalid = [];

  REQUIRED_VARS.forEach((varName) => {
    const value = envVars[varName];

    if (!value) {
      missing.push(varName);
    } else if (
      value === 'your-api-token' ||
      value === 'your-account-id' ||
      value === 'your-repo-id' ||
      value === 'your-category-id' ||
      value === 'your-session-secret-key-min-32-chars'
    ) {
      invalid.push(varName);
    } else if (varName === 'SITE_URL' || varName === 'DEV_URL') {
      try {
        new URL(value);
      } catch {
        invalid.push(`${varName} (invalid URL: ${value})`);
      }
    }
  });

  // Report results
  if (missing.length > 0 || invalid.length > 0) {
    console.error('❌ Environment validation failed!');

    if (missing.length > 0) {
      console.error('\n🚫 Missing variables:');
      missing.forEach((varName) => console.error(`  - ${varName}`));
    }

    if (invalid.length > 0) {
      console.error('\n⚠️  Invalid/placeholder values:');
      invalid.forEach((varName) => console.error(`  - ${varName}`));
    }

    console.log('\n💡 Update your .env file with proper values.');
    return false;
  }

  console.log('✅ Environment validation passed! All required variables are set.');
  console.log(`📍 Site URL: ${envVars.SITE_URL}`);
  console.log(`🚀 Dev URL: ${envVars.DEV_URL}`);
  return true;
}

function createEnvFromTemplate(template, description) {
  try {
    fs.writeFileSync(envPath, template);
    console.log(`✅ Successfully created .env file ${description}`);
    console.log('📝 Environment file has been configured with appropriate values.');
    console.log('');
    console.log('🔍 Run "npm run validate-env" to verify the configuration.');
    return true;
  } catch (error) {
    console.error('❌ Error creating .env file:', error.message);
    return false;
  }
}

function showHelp() {
  console.log('🔧 Environment Setup & Validation Tool\n');
  console.log('Usage: npm run setup-env [command]');
  console.log('       node scripts/setup-env.js [command]\n');
  console.log('Commands:');
  console.log('  validate    - Validate existing .env file');
  console.log('  dev         - Create .env with development-safe values');
  console.log('  prod        - Create .env from env.example template');
  console.log('  help        - Show this help message');
  console.log('  (no args)   - Default: create from template or validate existing\n');
  console.log('Examples:');
  console.log('  npm run setup-env dev      # Quick development setup');
  console.log('  npm run setup-env validate # Check current configuration');
  console.log('  npm run setup-env prod     # Production template setup');
}

// Check command line arguments
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'validate':
    // Just validate existing .env
    if (!validateEnv()) {
      process.exit(1);
    }
    break;

  case 'dev':
    // Create development environment
    if (fs.existsSync(envPath)) {
      console.log('⚠️  .env file already exists.');
      console.log('🔄 Creating backup and replacing with development configuration...');
      fs.copyFileSync(envPath, `${envPath}.backup.${Date.now()}`);
    }

    if (createEnvFromTemplate(DEV_ENV_TEMPLATE, 'with development configuration')) {
      console.log('🎉 Development environment ready!');
      console.log('📋 This configuration includes:');
      console.log('  - Real Giscus settings for comments');
      console.log('  - Development-safe Cloudflare tokens');
      console.log('  - Proper security headers enabled');
      console.log('  - All required environment variables');
    } else {
      process.exit(1);
    }
    break;

  case 'prod':
    // Create production template
    if (fs.existsSync(envPath)) {
      console.log('⚠️  .env file already exists.');
      console.log('💡 Delete .env first or use a different command.');
      process.exit(1);
    }

    if (
      createEnvFromTemplate(fs.readFileSync(envExamplePath, 'utf8'), 'from production template')
    ) {
      console.log('📝 Please update the values in .env with your actual configuration:');
      console.log('  - SITE_URL: Your production blog URL');
      console.log('  - GISCUS_*: Your GitHub repository settings');
      console.log('  - CLOUDFLARE_*: Your actual Cloudflare credentials');
      console.log('  - SESSION_SECRET: A secure random string (32+ characters)');
    } else {
      process.exit(1);
    }
    break;

  case 'help':
  case '--help':
  case '-h':
    showHelp();
    break;

  default:
    // Default behavior: smart setup
    if (fs.existsSync(envPath)) {
      console.log('⚠️  .env file already exists.');

      // Validate existing file
      if (validateEnv()) {
        console.log('🎉 Your environment is properly configured!');
        process.exit(0);
      } else {
        console.log('💡 Fix the issues above or use:');
        console.log('  - "npm run setup-env dev" for quick development setup');
        console.log('  - "npm run setup-env prod" for production template');
        process.exit(1);
      }
    } else {
      // No .env file exists, create from template
      if (createEnvFromTemplate(fs.readFileSync(envExamplePath, 'utf8'), 'from template')) {
        console.log('Important variables to configure:');
        console.log('- SITE_URL: Your production blog URL');
        console.log('- GISCUS_REPO: Your GitHub repository for comments');
        console.log('- GISCUS_REPO_ID: Your Giscus repository ID');
        console.log('- GISCUS_CATEGORY_ID: Your Giscus category ID');
        console.log('- CLOUDFLARE_API_TOKEN: Your Cloudflare API token');
        console.log('- CLOUDFLARE_ACCOUNT_ID: Your Cloudflare account ID');
        console.log('- SESSION_SECRET: A secure random string');
        console.log('');
        console.log('💡 Tip: Use "npm run setup-env dev" for quick development setup!');
      } else {
        process.exit(1);
      }
    }
    break;
}

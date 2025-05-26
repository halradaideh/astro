#!/bin/bash

# Script to set GIT_VERSION environment variable for deployment
# This should be run during the CI/CD build process

set -e

# Get the Git version
GIT_VERSION=$(git describe --tags --always --dirty 2>/dev/null || echo "unknown")

# Remove 'v' prefix if present
GIT_VERSION=${GIT_VERSION#v}

echo "🏷️  Detected Git version: $GIT_VERSION"

# Export for current shell session
export GIT_VERSION="$GIT_VERSION"

# For Cloudflare Pages, write to a file that can be sourced
echo "export GIT_VERSION=\"$GIT_VERSION\"" > .env.deploy

# For GitHub Actions, set output
if [ -n "$GITHUB_OUTPUT" ]; then
    echo "git_version=$GIT_VERSION" >> "$GITHUB_OUTPUT"
fi

# For other CI systems, print export command
echo "✅ To use this version in your deployment:"
echo "   export GIT_VERSION=\"$GIT_VERSION\""
echo "   or source .env.deploy"

echo "🚀 Version $GIT_VERSION ready for deployment" 
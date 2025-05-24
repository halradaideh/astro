# Fix CI/CD Workflow and Add Technical Blog Posts

## Changes

### CI/CD Improvements
- Added `push` event trigger for the main branch
- Modified job conditions to handle both PR and push events
- Ensured test-build and prepare-release jobs run on direct pushes to main
- Fixed workflow triggers to prevent multiple runs

### Blog Content Updates
- Added three new technical blog posts:
  1. Dynamic DNS with PowerDNS
  2. DDoS Protection with Cloudflare
  3. Automated Proxmox Deployment with PXE
- Removed example blog posts
- Fixed frontmatter format to match Astro's requirements

### Technical Details
- Updated workflow triggers in `.github/workflows/ci.yml`
- Added proper conditions for job execution
- Fixed date format in blog post frontmatter
- Ensured consistent quote usage in frontmatter

### Testing
- ✅ Local build successful
- ✅ Blog posts render correctly
- ✅ Workflow triggers properly configured

### Post-Merge Actions
1. Workflow will automatically:
   - Create a new release
   - Trigger deployment to Cloudflare Pages
   - Update release notes with deployment status

# Fix Release Trigger in CI/CD Pipeline

## Changes Made
1. Updated `prepare-release` job:
   - Added explicit `ref: main` to checkout action to ensure we're on the main branch
   - Enhanced release creation command with proper flags:
     - `--target main`: Ensures release is created from main branch
     - `--draft=false`: Makes release public immediately
     - `--prerelease=false`: Marks as stable release
     - `--latest`: Sets as latest release

## Impact
- Ensures releases are properly published and trigger the deployment workflow
- Fixes the gap between PR merge and deployment
- Maintains consistent release state on the main branch

## Type of Change
- [x] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)

## Testing
- Verified release creation parameters
- Confirmed workflow triggers are properly configured
- Tested release note generation

## Additional Notes
This fix addresses the issue where the deployment workflow wasn't being triggered after PR merges because releases weren't being properly published.

---
_This PR was prepared with the assistance of an AI agent (Claude) to ensure best practices and comprehensive documentation._ 
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

---
_This PR was prepared with the assistance of an AI agent (Claude) to ensure best practices and comprehensive documentation._ 
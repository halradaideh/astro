# Tech Blog with Astro + Giscus

[![CI](https://github.com/halradaideh/tech-blog/actions/workflows/ci.yml/badge.svg)](https://github.com/halradaideh/tech-blog/actions/workflows/ci.yml)
[![Deploy to Cloudflare Pages](https://github.com/halradaideh/tech-blog/actions/workflows/deploy.yml/badge.svg)](https://github.com/halradaideh/tech-blog/actions/workflows/deploy.yml)

A modern, fast, and interactive blog built with Astro and Giscus comments system. This blog is designed to provide a great reading experience and community interaction through GitHub Discussions.

## ✨ Features

- ✅ Modern, responsive design
- ✅ Fast page loads with Astro
- ✅ MDX support for rich content
- ✅ Interactive comments with Giscus
- ✅ SEO optimized
- ✅ RSS Feed support
- ✅ Sitemap support
- ✅ TypeScript support
- ✅ 100/100 Lighthouse performance

## 🚀 Project Structure

```text
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Navigation.astro
│   │   └── Comments.astro
│   ├── content/         # Blog posts and content
│   │   └── blog/
│   ├── layouts/         # Page layouts
│   │   └── BlogPost.astro
│   └── pages/          # Routes and pages
│       ├── index.astro
│       └── blog/
├── tests/              # Test files
├── astro.config.mjs    # Astro configuration
├── package.json        # Project dependencies
└── tsconfig.json      # TypeScript configuration
```

## 🛠️ Development

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- A GitHub account (for comments system)

### Setup

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd <repo-name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Giscus:
   - Enable Discussions in your GitHub repository
   - Install the Giscus GitHub App
   - Update the configuration in `src/components/Comments.astro`

### Development Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm test`                | Run tests                                        |
| `npm run test:watch`      | Run tests in watch mode                         |

## 🧪 Testing

This project includes:
- Unit tests for components
- Integration tests for pages
- E2E tests for critical user flows

Run tests with:
```bash
npm test
```

## 📝 Writing Posts

1. Create a new `.mdx` file in `src/content/blog/`
2. Add frontmatter with required fields:
   ```yaml
   ---
   title: "Your Post Title"
   description: "Brief description"
   pubDate: "2024-03-26"
   heroImage: "/path-to-image.jpg"
   tags: ["tag1", "tag2"]
   ---
   ```
3. Write your content in MDX format

## 🚀 Deployment

This site is configured for deployment on Cloudflare Pages. Follow these steps:

1. Push your code to GitHub
2. Connect your repository to Cloudflare Pages
3. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`

## 📜 License

MIT License - feel free to use this code for your own blog!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🔐 Configuration

### Environment Variables
Create a `.env` file in the root directory with the following variables:

```bash
# Giscus Configuration
# Get these values from https://giscus.app
GISCUS_REPO="username/repository"
GISCUS_REPO_ID="R_..."
GISCUS_CATEGORY_ID="DIC_..."

# Cloudflare Pages Configuration (only needed for local testing)
CLOUDFLARE_ACCOUNT_ID="your_account_id"
CLOUDFLARE_API_TOKEN="your_api_token"
```

### GitHub Repository Setup
1. Make your repository public
2. Enable Discussions in repository settings
3. Install [Giscus GitHub App](https://github.com/apps/giscus)
4. Get configuration values from [giscus.app](https://giscus.app):
   - Select your repository
   - Choose "Discussion" category
   - Choose "Page pathname" for mapping
   - Copy the generated configuration values

### GitHub Secrets
Add these secrets in your repository (Settings > Secrets and variables > Actions):

1. `CLOUDFLARE_API_TOKEN`:
   - Go to Cloudflare Dashboard > My Profile > API Tokens
   - Create new token with permissions:
     - Account.Cloudflare Pages: Edit
     - User.User Details: Read
     - Zone.Zone: Read

2. `CLOUDFLARE_ACCOUNT_ID`:
   - Found in Cloudflare Dashboard URL: `https://dash.cloudflare.com/<ACCOUNT_ID>`
   - Or in dashboard right sidebar

### Cloudflare Pages Setup
1. Create a new Pages project in Cloudflare Dashboard
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variables:
     - Add the same Giscus variables as in `.env`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

```sh
npm create astro@latest -- --template blog
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/blog)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/blog)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/blog/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![blog](https://github.com/withastro/astro/assets/2244813/ff10799f-a816-4703-b967-c78997e8323d)

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

This theme is based off of the lovely [Bear Blog](https://github.com/HermanMartinus/bearblog/).

# Pale Parsec Blog

A modern blog site built with Astro, featuring Giscus comments and Cloudflare Pages deployment.

## Features

- 🚀 Built with Astro for optimal performance
- 💬 Giscus comments integration
- 📱 Responsive design
- 📝 MDX support for rich content
- 🗺️ Sitemap generation
- 📊 RSS feed
- ☁️ Cloudflare Pages deployment

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables

Copy `.env.example` to `.env` and fill in the required values:

```env
# Giscus Configuration
GISCUS_REPO=username/repo-name
GISCUS_REPO_ID=your-repo-id
GISCUS_CATEGORY_ID=your-category-id

# Cloudflare Pages Configuration
CLOUDFLARE_API_TOKEN=your-api-token
CLOUDFLARE_ACCOUNT_ID=your-account-id
```

## Contributing

1. Create a feature branch from `develop`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git commit -m "feat: add new feature"
   ```

3. Create a Pull Request with appropriate labels:
   - Process Labels:
     - `ready-to-review`: Code is ready for review
     - `ready-to-test`: Code is ready for testing
     - `ready-to-deploy`: Code is ready for deployment
   - Version Labels:
     - `major`: Breaking changes
     - `minor`: New features
     - No label: Bug fixes (patch)

4. Wait for the CI workflow to complete:
   - Build testing
   - Version bump
   - Release creation
   - Deployment to Cloudflare Pages

## Branch Strategy

- `main`: Production branch
- `develop`: Development branch
- `feature/*`: Feature branches

## Release Process

Releases are automatically created when PRs with the `ready-to-deploy` label are merged into `main`. The version number is determined by the PR labels:

- `major`: Breaking changes (1.0.0 → 2.0.0)
- `minor`: New features (1.0.0 → 1.1.0)
- `patch`: Bug fixes (default) (1.0.0 → 1.0.1)

## License

MIT

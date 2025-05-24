# Hamdan Radaideh's Tech Blog

<div align="center">
  <img src="public/profile-banner.jpg" alt="Hamdan Radaideh - DevOps & SRE" width="100%" style="border-radius: 10px;">
</div>

[![Site Status](https://img.shields.io/website?url=https%3A%2F%2Fblog.radiadeh.info)](https://blog.radiadeh.info)
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

## 🚀 Development

### Prerequisites

1. **Cloudflare Account Setup**
   - Create a Cloudflare account
   - Set up a Cloudflare Worker
   - Create the following KV namespaces:
     - `BLOG_STATS` - For storing blog statistics
     - `BLOG_VIEWS` - For tracking page views
     - `BLOG_REACTIONS` - For storing user reactions

2. **Environment Variables**
   ```bash
   # Cloudflare
   CLOUDFLARE_ACCOUNT_ID=your_account_id
   CLOUDFLARE_API_TOKEN=your_api_token
   
   # Giscus (GitHub Discussions)
   GISCUS_REPO=your_repo
   GISCUS_REPO_ID=your_repo_id
   GISCUS_CATEGORY=your_category
   GISCUS_CATEGORY_ID=your_category_id
   ```

3. **KV Namespace Bindings**
   ```bash
   # Bind KV namespaces to your worker
   wrangler kv:namespace create BLOG_STATS
   wrangler kv:namespace create BLOG_VIEWS
   wrangler kv:namespace create BLOG_REACTIONS
   ```

### Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Cloudflare Workers
npm run deploy
```

### Cloudflare Worker Setup

1. **Initialize Wrangler**
   ```bash
   npx wrangler init
   ```

2. **Configure wrangler.toml**
   ```toml
   name = "blog-worker"
   main = "src/worker.ts"
   compatibility_date = "2024-01-01"

   kv_namespaces = [
     { binding = "BLOG_STATS", id = "your_kv_id" },
     { binding = "BLOG_VIEWS", id = "your_kv_id" },
     { binding = "BLOG_REACTIONS", id = "your_kv_id" }
   ]
   ```

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

## 📄 License

MIT License - Feel free to use this code for your own blog!

---

<div align="center">
  <sub>Built with ❤️ by Hamdan Radaideh | Powered by Claude AI</sub>
</div>

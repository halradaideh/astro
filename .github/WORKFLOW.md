# 🚀 Optimized CI/CD Workflow

This document explains the streamlined CI/CD workflow that minimizes build times and uses label-based triggers.

## 📋 Workflow Overview

### **Single Build, Multiple Uses**

- ✅ Build artifacts **once** and reuse across all jobs
- ✅ Smart caching for `node_modules` and Playwright browsers
- ✅ No duplicate npm installs or builds

### **Label-Based Workflow Control**

| Label             | Purpose              | Triggers                                                |
| ----------------- | -------------------- | ------------------------------------------------------- |
| `ready-to-test`   | Start CI/CD pipeline | Quality checks + Build + Tests + Security + Performance |
| `ready-to-review` | Enable merging       | (Manual process - for reviewers)                        |
| `ready-to-deploy` | Deploy to production | Release creation + Deployment                           |
| `deployed`        | Mark as deployed     | (Auto-added after successful deployment)                |

## 🔄 Workflow Steps

### 1. **Build & Test Job** (Runs Once)

- 🔍 Quality checks (ESLint, formatting, type checking)
- 🏗️ Build the site once
- 🧪 Run Playwright tests
- 📦 Upload build artifacts with unique hash
- ⚡ Uses smart caching for dependencies

### 2. **Parallel Jobs** (Use Cached Artifacts)

- 🔒 **Security Scan**: Trivy vulnerability scanner
- ⚡ **Performance Test**: Lighthouse CI + bundle size

### 3. **Release & Deploy** (Only when `ready-to-deploy`)

- 🏷️ Auto-versioning with semantic tags
- 📝 Auto-generated release notes from commits
- 🚀 Deploy to Cloudflare Pages
- 🧹 Cleanup artifacts after deployment

## 🏷️ Label Usage Guide

### **For Developers:**

1. **Open PR** → Automatically gets basic checks
2. **Add `ready-to-test`** → Triggers full CI pipeline
3. **Add `ready-to-deploy`** → Triggers release & deployment

### **For Reviewers:**

1. **Review code** → Standard review process
2. **Add `ready-to-review`** → Signals approval for merge
3. **Merge when ready** → Does NOT auto-deploy

### **For Deployment:**

1. **Add `ready-to-deploy`** → Triggers deployment pipeline
2. **Auto cleanup** → `ready-to-deploy` removed, `deployed` added

## ⚡ Performance Benefits

### **Before Optimization:**

- 🐌 5 separate jobs doing duplicate builds
- 🐌 Multiple npm installs across jobs
- 🐌 ~15-20 minutes total runtime

### **After Optimization:**

- ⚡ Single build reused across all jobs
- ⚡ Smart caching reduces install time by 80%
- ⚡ ~5-8 minutes total runtime
- ⚡ Parallel execution where possible

## 🎯 Key Features

### **Artifact Management**

- 📦 Build once, use everywhere
- 🔑 Unique hash-based artifact naming
- 🧹 Automatic cleanup after deployment

### **Smart Caching**

- 📂 Node modules cached across runs
- 🎭 Playwright browsers cached
- ⚡ Cache invalidation on `package-lock.json` changes

### **Label Automation**

- 🏷️ Auto-remove `ready-to-deploy` after success
- 🏷️ Auto-add `deployed` label
- 🏷️ Clear status tracking

## 🔧 Commands for Development

```bash
# No changes needed - same commands work
npm run dev
npm run build
npm run test
npm run validate-env
```

## 🚨 Troubleshooting

### **CI Not Running?**

- ✅ Check if `ready-to-test` label is applied
- ✅ Verify branch is `main` or has open PR

### **Deployment Not Triggered?**

- ✅ Ensure `ready-to-deploy` label is applied
- ✅ Check that all tests passed first

### **Performance Issues?**

- ✅ Cache should warm up after first run
- ✅ Check if `node_modules` cache is being used

---

**💡 Pro Tip**: Use `ready-to-test` early in development, `ready-to-deploy` only when you're confident in the changes!

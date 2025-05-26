# 🤖 AI Agent Quick Command Reference

## ⚡ MANDATORY PRE-FLIGHT CHECKS

```bash
npm run validate-env                    # REQUIRED: Environment validation
npm run pre-commit                      # REQUIRED: Full validation (format, lint, type, build)
git status && git branch               # REQUIRED: Current state check
```

## 🔧 PRE-COMMIT VALIDATION COMMANDS

```bash
npm run pre-commit                      # Full validation: format:check + lint + typecheck + build
npm run pre-commit:fix                  # Auto-fix formatting + lint issues + validation
npm run format:check                    # Check code formatting only
npm run format                          # Fix code formatting issues
```

## 🔄 STANDARD WORKFLOW COMMANDS

```bash
# 1. CREATE BRANCH (use exact format)
git checkout -b {type}/{scope}/{description}

# 2. IMPLEMENT CHANGES
# ... make code changes ...

# 3. VALIDATE IMPLEMENTATION (MANDATORY)
npm run pre-commit

# 4. COMMIT (use exact format)
git add .
git commit -m "{type}({scope}): {description}"

# 5. CREATE PR (all labels required)
git push origin {branch-name}
gh pr create \
  --title "{type}({scope}): {description}" \
  --body-file .github/pull_request_template.md \
  --label "ready-to-test,{type-label},{size-label},{priority-label}"

# 6. DEPLOY AFTER APPROVAL
gh pr edit --add-label "ready-to-deploy"
gh pr merge --squash --delete-branch
```

## 📝 EXACT STRINGS TO USE

### Branch Types (use exact strings):

```
feat      fix       refactor   perf      docs
test      ci        chore      hotfix
```

### Commit Types (use exact strings):

```
feat      fix       docs       style     refactor
perf      test      chore      ci        revert
```

### Scopes (use exact strings):

```
ui        api       auth       config    deps      security
```

### PR Labels (all required):

```
# CI Trigger (MANDATORY)
ready-to-test

# Type (choose one)
feature | bugfix | enhancement | documentation | security

# Size (choose one)
size:xs | size:s | size:m | size:l

# Priority (choose one)
priority:high | priority:medium | priority:low
```

## 🌿 BRANCH NAME EXAMPLES

```bash
git checkout -b feat/ui/add-dark-mode
git checkout -b fix/auth/resolve-timeout
git checkout -b perf/ui/optimize-images
git checkout -b chore/deps/update-astro
git checkout -b hotfix/security/fix-xss
```

## 🛠️ TOOL COMMANDS

### GitHub CLI:

```bash
gh pr status                           # Check PR status
gh pr create --label "ready-to-test"   # Create PR with CI trigger
gh pr edit --add-label "ready-to-deploy" # Add deployment label
gh pr merge --squash --delete-branch   # Merge and cleanup
```

### Wrangler:

```bash
wrangler pages deploy dist --project-name=tech-blog
wrangler pages deployment list --project-name=tech-blog
```

### Project Validation:

```bash
npm run validate-env    # Environment check
npm run lint           # ESLint validation
npm run typecheck      # TypeScript check
npm run test           # Playwright tests
npm run build          # Build verification
```

## 🚨 ERROR RECOVERY COMMANDS

```bash
# Environment issues
npm run setup-env:dev

# CI failures
gh pr status && gh run view $(gh run list --limit 1 --json workflowName,conclusion,databaseId --jq '.[0].databaseId')

# Build failures
npm run build && npm run preview

# Force update after fixes
git add . && git commit --amend --no-edit && git push --force-with-lease
```

## ✅ VALIDATION CHECKLIST

Execute in order (all must return exit code 0):

- [ ] `npm run validate-env`
- [ ] `npm run pre-commit` (includes format:check, lint, typecheck, build)
- [ ] Branch name format: `{type}/{scope}/{description}`
- [ ] Commit format: `{type}({scope}): {description}`
- [ ] All required PR labels added

## 🚨 ERROR RECOVERY FOR FORMATTING

```bash
# If format:check fails during pre-commit:
npm run format                         # Auto-fix formatting issues
npm run pre-commit                     # Re-run full validation

# Or use the combined command:
npm run pre-commit:fix                 # Auto-fix + validate everything
```

## 📊 STATUS CODES

Use these exact status formats:

```
STATUS: CREATING_BRANCH
STATUS: IMPLEMENTING
STATUS: TESTING
STATUS: CREATING_PR
STATUS: WAITING_CI
STATUS: DEPLOYING
```

```
ERROR: {VALIDATION_FAILED|BUILD_FAILED|TEST_FAILED|DEPLOYMENT_FAILED}
COMMAND: {failed-command}
ACTION: {remediation-step}
```

---

📖 **Full protocols:** [`AI_AGENT_CONVENTIONS.md`](../AI_AGENT_CONVENTIONS.md)

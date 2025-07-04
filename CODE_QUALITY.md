# Code Quality Configuration

This project is configured with ESLint, Prettier, and Husky for maintaining code quality and consistency.

## 📋 Overview

- **ESLint**: Linting and code quality rules
- **Prettier**: Code formatting
- **Husky**: Git hooks for automated quality checks
- **lint-staged**: Run linters on staged files only

## 🛠️ Configuration Files

### ESLint Configuration
- **File**: `.eslintrc.js`
- **Purpose**: Defines linting rules for JavaScript/TypeScript files
- **Includes**: React Native, TypeScript, and React rules

### Prettier Configuration
- **File**: `.prettierrc.js`
- **Purpose**: Defines code formatting rules
- **Ignore File**: `.prettierignore`

### Husky Git Hooks
- **Directory**: `.husky/`
- **Files**:
  - `pre-commit`: Runs lint-staged before commits
  - `commit-msg`: Validates commit message format

### Lint-staged Configuration
- **File**: `.lintstagedrc.js`
- **Purpose**: Defines which tools to run on staged files

## 🚀 Available Scripts

### Code Quality Scripts
```bash
# Run ESLint
yarn lint

# Fix ESLint issues automatically
yarn lint:fix

# Check ESLint with zero warnings tolerance
yarn lint:check

# Check Prettier formatting
yarn prettier

# Fix Prettier formatting
yarn prettier:fix

# Format code with both Prettier and ESLint
yarn format

# Check TypeScript types
yarn type-check

# Run all quality checks
yarn quality

# Run lint-staged manually
yarn pre-commit
```

### Test Scripts
```bash
# Run tests
yarn test

# Run tests in watch mode
yarn test:watch

# Run tests with coverage
yarn test:coverage
```

## 🔧 Git Hooks

### Pre-commit Hook
Automatically runs when you commit:
1. Runs ESLint on staged files and fixes issues
2. Runs Prettier on staged files and formats them
3. Re-stages the fixed files

### Commit Message Hook
Validates commit messages follow conventional commits format:
- `feat: add new feature`
- `fix: resolve bug`
- `docs: update documentation`
- `style: format code`
- `refactor: improve code structure`
- `test: add tests`
- `chore: update dependencies`

## 📝 Usage Examples

### Before Committing
The hooks will automatically run, but you can manually check:

```bash
# Check all quality rules
yarn quality

# Fix all formatting and linting issues
yarn format
```

### Conventional Commit Messages
```bash
# ✅ Good commit messages
git commit -m "feat: add user authentication"
git commit -m "fix: resolve navigation bug"
git commit -m "docs: update readme"
git commit -m "style: format code with prettier"

# ❌ Bad commit messages (will be rejected)
git commit -m "updated stuff"
git commit -m "fixed bug"
git commit -m "changes"
```

### Manual Quality Checks
```bash
# Check for linting issues
yarn lint

# Fix linting issues
yarn lint:fix

# Check formatting
yarn prettier

# Fix formatting
yarn prettier:fix

# Check TypeScript
yarn type-check
```

## 🎯 Benefits

1. **Consistent Code Style**: Prettier ensures uniform formatting
2. **Code Quality**: ESLint catches potential issues and enforces best practices
3. **Type Safety**: TypeScript checking prevents type-related bugs
4. **Automated Checks**: Git hooks ensure quality before commits
5. **Conventional Commits**: Standardized commit messages improve project history
6. **Fast Execution**: lint-staged only processes changed files

## 🔧 Customization

### Adding New ESLint Rules
Edit `.eslintrc.js` and add rules in the `rules` section:

```javascript
rules: {
  'your-new-rule': 'error',
  // ... other rules
}
```

### Modifying Prettier Settings
Edit `.prettierrc.js`:

```javascript
module.exports = {
  // ... existing settings
  newSetting: 'value',
};
```

### Adding New File Types to lint-staged
Edit `.lintstagedrc.js`:

```javascript
module.exports = {
  // ... existing patterns
  '*.{new,extension}': ['your-command'],
};
```

## 🚨 Troubleshooting

### Skip Git Hooks (Emergency)
```bash
# Skip all hooks
git commit --no-verify -m "emergency commit"

# Skip only pre-commit
HUSKY=0 git commit -m "skip pre-commit"
```

### Fix Configuration Issues
```bash
# Reinstall husky hooks
yarn husky install

# Test lint-staged
yarn lint-staged --debug

# Check ESLint configuration
yarn lint --debug
```

# Contributing to Logger

Thank you for your interest in contributing to Logger! This document will guide you through the process so you can collaborate effectively.

## Table of Contents

- [Environment Setup](#environment-setup)
- [How to Contribute](#how-to-contribute)
- [Code Standards](#code-standards)
- [Running Tests](#running-tests)
- [Submitting Changes](#submitting-changes)
- [Commit Message Guide](#commit-message-guide)
- [Reporting Bugs](#reporting-bugs)
- [Feature Suggestions](#feature-suggestions)

## Environment Setup

### Prerequisites

Make sure you have installed:
- **Node.js** 12 or higher - [Download](https://nodejs.org/)
- **npm** (included with Node.js)
- **Git** - [Download](https://git-scm.com/)

### Setup Steps

1. **Fork the Repository**
   ```bash
   # Go to the original repository and click "Fork"
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/your-username/logger.git
   cd logger
   ```

3. **Add the Original Repository as Remote (upstream)**
   ```bash
   git remote add upstream https://github.com/rusker86/logger.git
   git remote -v  # Verify you have origin and upstream
   ```

4. **Install Dependencies**
   ```bash
   npm install
   ```

5. **Verify Everything Works**
   ```bash
   npm test
   ```

## How to Contribute

### Types of Contributions

- 🐛 **Bug Fixes**: Solve identified issues
- ✨ **New Features**: Add new functionality
- 📝 **Documentation**: Improve README, code comments, etc.
- 🧪 **Tests**: Increase test coverage
- 🎨 **Code Improvements**: Refactoring and optimizations
- ♿ **Accessibility**: Improve usability

### Workflow

1. **Create a New Branch**
   ```bash
   git checkout -b feature/descriptive-name
   # or for fixes:
   git checkout -b fix/bug-name
   ```

2. **Make Your Changes**
   - Modify only what's necessary
   - Follow the [Code Standards](#code-standards)
   - Add comments where necessary

3. **Run Tests Locally**
   ```bash
   npm test
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "type: brief description"
   ```

5. **Sync with the Main Repository**
   ```bash
   git fetch upstream
   git rebase upstream/master
   ```

6. **Push Your Changes**
   ```bash
   git push origin your-branch
   ```

7. **Create a Pull Request (PR)**
   - Go to GitHub and open a PR towards the `master` branch
   - Fill in the PR description clearly
   - Wait for feedback

## Code Standards

### General Style

- **Language**: JavaScript ES6+
- **Module Type**: ES Modules (ESM)
- **Indentation**: 2 spaces
- **Semicolons**: Not required
- **Quotes**: Double quotes `"`

### Code Example

```javascript
// ✅ CORRECT
const createLogger = (options = {}) => {
  const { enableCaller = false } = options
  return {
    info: (message, metadata) => {
      // implementation
    }
  }
}

// ❌ INCORRECT
const createLogger = (options = {}) => {
return {
info: (message, metadata) => {
// implementation
}
}
}
```

### Naming Conventions

- **Functions**: `camelCase` - `createLogger()`, `getTimeStamp()`
- **Constants**: `UPPER_SNAKE_CASE` - `DEFAULT_LEVEL`, `LOG_DIR`
- **Files**: `camelCase.js` - `createLogger.js`, `logToConsole.js`
- **Folders**: `lowercase` - `utils/`, `tests/`, `logs/`

### Comments

Add comments only when necessary:

```javascript
// ✅ Useful comment - explains WHY, not WHAT
// Escape quotes to maintain CSV integrity
const escaped = value.replace(/"/g, "\"\"")

// ❌ Unnecessary comment - obvious from code
// Increment the counter
counter++
```

### Function Documentation

For new functions, include JSDoc:

```javascript
/**
 * Creates a new logger instance
 * @param {Object} options - Configuration options
 * @param {boolean} options.enableCaller - Include caller information
 * @returns {Object} Logger instance with log methods
 */
const createLogger = (options = {}) => {
  // implementation
}
```

## Running Tests

### Test Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with detailed output
npm run test:verbose
```

### Writing New Tests

- Create test files in the `tests/` folder
- Follow the pattern: `functionName.test.js`
- Use Node.js native test framework (`node:test`)
- Check [tests/README.md](tests/README.md) for details

Example:

```javascript
import test from "node:test"
import assert from "node:assert"
import { myFunction } from "../utils/myFunction.js"

test("myFunction should do X when receives Y", () => {
  const result = myFunction("input")
  assert.strictEqual(result, "expected")
})
```

### Test Coverage

Goal: Maintain coverage > 80%

- Include positive cases
- Include edge cases
- Include error cases

## Submitting Changes

### Before Making a Pull Request

- [ ] I have run `npm test` and all pass
- [ ] I have followed the [Code Standards](#code-standards)
- [ ] I have updated documentation if necessary
- [ ] I have added tests for new features
- [ ] My branch is updated with `upstream/master`

### Describe Your Pull Request

```markdown
## Description
[Explain what changes you made and why]

## Type of Change
- [ ] Bug fix (fixes an issue)
- [ ] Feature (adds functionality)
- [ ] Breaking change (incompatible change)
- [ ] Documentation

## Related Issues
Fixes #XXX (issue number, if applicable)

## How to Test
[Steps to verify that it works correctly]

## Checklist
- [ ] My code follows the project standards
- [ ] I have updated documentation
- [ ] I have added tests if necessary
- [ ] All tests pass locally
```

## Commit Message Guide

Use clear and descriptive commits:

```bash
# Format: type: brief description
git commit -m "feat: add log colorization"
git commit -m "fix: correct quote escaping in CSV"
git commit -m "docs: update installation instructions"
git commit -m "test: add tests for callerInfo"
```

### Commit Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **test**: Add or update tests
- **refactor**: Code changes without affecting functionality
- **perf**: Performance improvements
- **chore**: Administrative tasks, dependencies

## Reporting Bugs

### How to Report

1. **Check** that the bug hasn't been reported before
2. **Describe the problem** clearly
3. **Include steps to reproduce**
4. **Provide specific examples**

### Bug Report Template

```markdown
## Description
[Clear description of the problem]

## Steps to Reproduce
1. Run...
2. Input...
3. Observe the error...

## Expected Behavior
[What should happen]

## Actual Behavior
[What actually happens]

## System Information
- Node.js: [version]
- npm: [version]
- OS: [Windows/macOS/Linux]

## Logs/Errors
[Include error messages if applicable]
```

## Feature Suggestions

Have an idea to improve Logger?

1. **Check** that a similar suggestion doesn't exist
2. **Describe your idea** clearly
3. **Explain why** it would be useful
4. **Provide examples** if possible

### Feature Suggestion Template

```markdown
## Description
[Clear explanation of the improvement]

## Motivation
[Why it would be useful for users]

## Example Usage
[How the feature would look in action]

## Alternatives
[Other ways to solve the problem]
```

## Frequently Asked Questions

**Q: Where do I report bugs?**
A: In the Issues section of GitHub

**Q: Can I work on an issue already assigned?**
A: Ask on the issue first. You can offer help

**Q: How long does it take to review a PR?**
A: Depends on complexity, usually 1-2 weeks

**Q: Do I need permission to create a branch?**
A: No, work in your fork. You only need a PR when ready

## Code of Conduct

- Be respectful to other contributors
- Maintain an inclusive environment
- Avoid offensive language
- Focus on code, not people
- Help others when you can

---

Thank you for contributing to Logger! 🙌

If you have questions, open an issue or contact the maintainers.

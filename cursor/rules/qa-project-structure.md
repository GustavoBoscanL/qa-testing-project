# QA Project Structure Rules (Cypress)

## Overview

Standardized folder structure and naming conventions for Cypress QA automation projects. **Minimalist approach** focusing on essential components only. Designed for Senior QA Engineers following Cypress best practices.

## Directory Structure Template

```
qa-automation/
├── _config/                    # Configuration files
│   └── cypress.config.js       # Cypress configuration
│
├── cypress/                    # Cypress framework files
│   ├── e2e/                    # E2E test files (.cy.js)
│   │   ├── login.cy.js
│   │   └── register.cy.js
│   ├── fixtures/               # Cypress fixtures (JSON data)
│   │   └── users.json
│   └── support/                # Support files
│       ├── commands.js         # Custom Cypress commands
│       └── e2e.js              # E2E support file
│
├── cursor/                     # Project rules and conventions
│   └── rules/
│       ├── bug-report-format.md
│       └── qa-project-structure.md
│
├── package.json
├── .gitignore
└── README.md
```

## Naming Conventions

### Folder Naming Rules

**Prefix Pattern:**
- Configuration folders **MUST** start with underscore (`_`)
- Cypress folders **MUST NOT** use underscore prefix
- Use lowercase with hyphens for multi-word folders

| Prefix | Purpose | Example |
|:-------|:--------|:--------|
| `_config/` | Configuration files | `_config/cypress.config.js` |

**Cypress Folders (No Prefix):**
- `cypress/` - Main Cypress directory
- `cypress/e2e/` - End-to-end test files (`.cy.js` extension)
- `cypress/fixtures/` - Cypress fixtures (JSON data)
- `cypress/support/` - Support files (commands, helpers)

### File Naming Rules

| File Type | Format | Location | Example |
|:----------|:-------|:---------|:--------|
| Test Files | `<test-name>.cy.js` | `cypress/e2e/` | `login.cy.js` |
| Config Files | `<tool>.config.js` | `_config/` | `cypress.config.js` |
| Fixture Files | `<purpose>.json` | `cypress/fixtures/` | `users.json` |
| Support Files | `commands.js`, `e2e.js` | `cypress/support/` | `commands.js` |

## Folder Descriptions

### `_config/` - Configuration Files

**Purpose:** Centralized configuration for Cypress.

**Rules:**
- Main config: `cypress.config.js` in `_config/` directory
- Environment variables via `env` property in config
- Never commit sensitive credentials

**Example Config:**
```javascript
const { defineConfig } = require('cypress')
module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
  },
  env: { apiUrl: 'http://localhost:3000/api' }
})
```

### `cypress/e2e/` - E2E Tests

**Purpose:** Main Cypress end-to-end test files.

**Rules:**
- Organize by feature/module
- One test file per feature/scenario
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Use Cypress best practices

**Example Test:**
```javascript
/// <reference types="cypress" />
describe('Login Flow', () => {
  beforeEach(() => cy.visit('/'))
  
  it('should login successfully', () => {
    cy.fixture('users').then((users) => {
      cy.loginUser(users.testUsers[0].email, users.testUsers[0].password)
      cy.get('a[href="/logout"]').should('be.visible')
    })
  })
})
```

### `cypress/fixtures/` - Test Data

**Purpose:** Static test data files (JSON format).

**Rules:**
- Use JSON format only
- Keep fixtures small and focused
- Use `cy.fixture()` to load in tests
- Organize by feature/module

**Example Fixture:**
```json
{
  "testUsers": [{
    "id": 1,
    "name": "Test User",
    "email": "test@example.com",
    "password": "TestPassword123!"
  }]
}
```

### `cypress/support/` - Support Files

**Purpose:** Custom Cypress commands and support utilities.

**Rules:**
- Define custom commands in `commands.js`
- Import commands in `e2e.js`
- Keep commands reusable and well-documented

**Example Commands:**
```javascript
// cypress/support/commands.js
Cypress.Commands.add('loginUser', (email, password) => {
  cy.visit('/login')
  cy.get('[data-qa="login-email"]').type(email)
  cy.get('[data-qa="login-password"]').type(password)
  cy.get('[data-qa="login-button"]').click()
  cy.get('a[href="/logout"]').should('be.visible')
})

// cypress/support/e2e.js
import './commands'
```

### `cursor/rules/` - Project Rules

**Purpose:** Project-specific rules and conventions.

**MUST Include:**
- `bug-report-format.md` - Bug report template
- `qa-project-structure.md` - This file

## File Organization

### Test File Structure

1. Cypress reference (if TypeScript)
2. Test suite (`describe` block)
3. Hooks (`before`, `beforeEach`, `after`, `afterEach`)
4. Test cases (`it` blocks)
5. Helper functions (prefer custom commands)

**Example:**
```javascript
/// <reference types="cypress" />
describe('Feature Name', () => {
  let testData
  
  before(() => {
    cy.fixture('users').then((users) => { testData = users })
  })
  
  beforeEach(() => cy.visit('/'))
  
  it('should do something', () => {
    // Arrange, Act, Assert
  })
})
```

## .gitignore Rules

**MUST Ignore:**
```
# Dependencies
node_modules/
.pnp/

# Cypress
cypress/videos/
cypress/screenshots/

# Environment files
.env
.env.local
_config/cypress.env.json

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Test artifacts
coverage/
.nyc_output/

# Logs
*.log
```

## Validation Checklist

Before committing code, verify:

**Structure:**
- [ ] All folders follow naming conventions
- [ ] Test files use `.cy.js` extension
- [ ] Files are in correct directories
- [ ] Folder structure matches template

**Code Quality:**
- [ ] Tests follow AAA pattern
- [ ] Custom commands are reusable
- [ ] Fixtures are properly structured JSON
- [ ] Tests are independent and isolated

**Documentation:**
- [ ] README.md updated
- [ ] Code comments present where needed
- [ ] Test descriptions are clear

## Best Practices

✅ **DO:**
- Use `.cy.js` extension for test files
- Organize tests in `cypress/e2e/` directory
- Use Cypress fixtures (`cypress/fixtures/`) for test data
- Define custom commands in `cypress/support/commands.js`
- Keep structure simple and minimal
- Follow AAA pattern in tests
- Use Cypress best practices (proper waits, chainable commands)
- Leverage Cypress automatic retries and waits
- Use `cy.fixture()` for loading test data

❌ **DON'T:**
- Use `.spec.js` extension (use `.cy.js`)
- Hardcode test data in test files
- Duplicate code (use custom commands)
- Commit sensitive data
- Use brittle selectors (IDs, classes that change)
- Use `cy.wait()` with arbitrary timeouts (prefer element waits)
- Mix async/await with Cypress commands (use Cypress chainable API)
- Use `cy.pause()` or `cy.debug()` in production tests

## Cypress-Specific Best Practices

**Commands:** Use custom commands for reusable actions (`cy.loginUser()`, `cy.registerUser()`). Chain Cypress commands for readability.

**Waits:** Let Cypress automatically wait for elements. Use `.should()` assertions for implicit waits. Avoid `cy.wait(number)` - use element-based waits instead.

**Fixtures:** Store static test data in `cypress/fixtures/`. Use `cy.fixture()` to load JSON data. Keep fixtures small and focused.

**Selectors:** Prefer `data-qa` or `data-testid` attributes. Use Cypress's built-in selector strategies (cy.get, cy.contains). Avoid XPath when CSS selectors work.

This structure ensures simplicity, maintainability, and professional organization for Cypress QA automation projects while keeping the structure minimal and focused on essentials.

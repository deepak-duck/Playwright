# AutomationExercise Playwright BDD Test Suite

End-to-end tests for Automation Exercise using Playwright + Gherkin BDD.

**Overview**
This repo contains a Playwright-based, BDD-style test suite for the Automation Exercise demo site. Feature files in `features/` are mapped to step definitions in `steps/`, with a small Page Object layer in `pages/`. The current scenarios cover user account flows such as registration, login (success and failure), logout, and duplicate email registration.

**Tech Stack**
- Node.js (LTS recommended)
- TypeScript
- Playwright (`@playwright/test`)
- `playwright-bdd` (Gherkin features + step definitions)

**Project Structure**
- `features/` Gherkin scenarios (TC001–TC005)
- `steps/` BDD step definitions
- `pages/` Page Objects used by steps
- `tests/` Playwright spec tests (example spec included)
- `playwright.config.ts` Playwright configuration
- `.github/workflows/playwright.yml` CI workflow

**How to Run**
1. Install dependencies: `npm install`
2. Install Playwright browsers: `npx playwright install`
3. Run BDD tests: `npm run test:bdd`
4. Optional modes: `npm run test:bdd:headed` or `npm run test:bdd:ui`

**Configuration**
- Base URL: `https://automationexercise.com`
- Timeout: 60 seconds
- Retries: 1
- Reporters: `html`, `list`
- Artifacts: trace on first retry, screenshot on failure, video on first retry
- Workers: 1 in CI, default locally

**Reports**
- HTML report output: `playwright-report/`
- Open the latest report: `npx playwright show-report`

**CI**
- Runs on `push` and `pull_request` to `main` and `master`
- Executes `npm ci`, installs browsers with deps, runs `npm run test:bdd`
- Uploads `playwright-report` as an artifact for 30 days

# 🚀 Pull Request Checklist & Architectural Review

Welcome, Contributor! Thank you for investing your expertise into **CogniFlow-AI-Tab-Organization-Browser-Extension**.

Every Pull Request (PR) must pass this rigorous checklist to ensure zero-defect delivery and architectural alignment with Apex Standards (2026).

---

## 1. 🎯 PR Summary & Scope

<!-- Describe the change clearly. Reference associated issue numbers if applicable (e.g., Closes #123). -->

**Type of Change:**

- [ ] `feat`: New feature implementation
- [ ] `fix`: Bug fix (non-breaking)
- [ ] `refactor`: Code cleanup without changing behavior (e.g., structural changes, variable renaming)
- [ ] `perf`: Performance optimization
- [ ] `docs`: Documentation only changes
- [ ] `chore`: Maintenance tasks (build process, tooling, CI)
- [ ] `style`: Formatting, missing semicolons, code style (Biome handled)

**Key Motivation:**

*Briefly explain *why* this change is necessary, referencing system goals (e.g., "Refactoring the tab-grouping service to adhere to SRP").*

---

## 2. 🧠 Architectural Compliance (Self-Verification)

*Check every applicable item below. If you are unsure, run the local linting/testing environment first.* 

### Code Quality & Design

- [ ] **SOLID:** Does this change adhere to Single Responsibility Principle (SRP)? Are any functions violating CQS (Command/Query Separation)?
- [ ] **DRY & KISS:** Is logic duplicated? Can this be simplified?
- [ ] **Guard Clauses:** Are complex nested `if` statements replaced by early returns?
- [ ] **Semantics:** Are all variables, functions, and components named clearly and descriptively?
- [ ] **Immutability:** Are state mutations minimized or strictly controlled (using Signals patterns)?

### Gemini/AI Integration & Security

- [ ] **Input Sanitization:** If this change interacts with API endpoints or user input, is output escaping/sanitization rigorously applied (OWASP 2025 Top 10)?
- [ ] **Model Fallback:** If an AI call fails, does the application gracefully degrade or retry (Exponential Backoff implemented)?
- [ ] **Configuration:** Are new secrets or configuration items correctly pulled from runtime/environment variables, not hardcoded?

---

## 3. 🧪 Testing Strategy (F.I.R.S.T. Mandate)

*All features must have corresponding, isolated tests.* 

- [ ] **Unit Tests Added/Updated:** Are new features covered by Vitest unit tests?
- [ ] **Edge Cases Covered:** Have you tested null/undefined inputs, maximum limits, and error states?
- [ ] **E2E Impact:** If UI/UX is changed, is the Playwright suite updated or verified?
- [ ] **Coverage Threshold:** Does this PR maintain or increase overall code coverage?

---

## 4. ⚙️ Technical Details & Automation

- [ ] **CI/CD Verification:** Have you verified that local linting (`biome check --apply`) and testing (`vitest`) pass before pushing?
- [ ] **Dependencies:** If new dependencies were added, are they necessary and lightweight? (Prioritize built-in browser APIs or standard libs).
- [ ] **Version Bump:** If this is a feature or breaking change, update the version in `manifest.json` and `package.json` according to Semantic Versioning.
- [ ] **README Sync:** Have you updated the `README.md` badges/sections if the core functionality or stack changed?

---

## 5. 🖼️ UI/UX & Aesthetics (If Applicable)

- [ ] **Fluid Motion:** Are CSS transitions used for state changes to ensure fluid motion (0.2s standard)?
- [ ] **Configurability:** Are any new UI elements exposed via the Settings schema for hyper-personalization?
- [ ] **Performance:** Does this change risk increasing INP (Interaction to Next Paint) or TTI (Time to Interactive)?

---

**By submitting this PR, I confirm that the changes align with the Apex Technical Authority directives and that the repository is left in a Zero-Defect state upon merge.**

**Author Signature:** `[Your Name/Handle]`

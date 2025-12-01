# 🤝 Contributing to CogniFlow-AI-Tab-Organization-Browser-Extension

Welcome to the next generation of workspace intelligence. We uphold the **Apex Technical Authority** standard: **Zero-Defect, High-Velocity, Future-Proof.** Contributions that align with these principles are highly valued.

## 1. Foundational Prerequisites

Before initiating any development, ensure your local environment adheres to the mandated Apex Toolchain standard:

1.  **Node.js/npm:** Latest LTS version (v20+ recommended).
2.  **Git:** Version 2.30+.
3.  **Core Tools:** Ensure `biome` and `vitest` are installed globally or runnable via `npx`.

## 2. The Recursive Perfection Loop (Mandatory Development Cycle)

Every contribution must pass through the local validation loop before a Pull Request is created. This mirrors our CI/CD gate:

1.  **Audit & Fix:** Implement the feature/fix, adhering strictly to **SOLID** principles and **Self-Documenting Code**. Avoid nesting; favor Guard Clauses.
2.  **Format:** Run `npx @biomejs/biome check --apply` to ensure absolute formatting compliance.
3.  **Test:** Write comprehensive tests in the corresponding `tests/` directory. Ensure **100%** coverage on all modified logic paths (success, failure, edge cases).
4.  **Verify:** Execute the full test suite: `npx vitest run`.
5.  **DECISION GATE:** If any linter warning, formatting error, or test failure occurs, **RETURN TO STEP 1** immediately. **DO NOT COMMIT** until the build is perfectly clean.

## 3. Commit Message Standard (Conventional Commits)

All commits **MUST** follow the [Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0/).

| Type | Purpose | Example |
| :--- | :--- | :--- |
| `feat` | A new feature (e.g., new Gemini integration endpoint). | `feat: add support for Gemini 3.0 model selection` |
| `fix` | A bug fix. | `fix: resolve memory leak during tab grouping` |
| `refactor` | Code change that neither fixes a bug nor adds a feature. | `refactor: simplify useSession hook logic` |
| `docs` | Documentation only changes. | `docs: update README architecture diagram` |
| `test` | Adding missing tests or correcting existing tests. | `test: add Playwright scenario for persistence failure` |
| `ci` | Changes to CI configuration files and scripts. | `ci: update required node version in workflow` |

## 4. Pull Request Submission Protocol

1.  **Branching:** Work on feature branches off `main` (e.g., `feat/ai-settings-ui`).
2.  **Issue Linking:** Every non-trivial PR **MUST** reference an existing Issue (e.g., `Closes #123`). If you create a new issue, link it in the PR description.
3.  **Template Use:** Use the provided PR Template (`.github/PULL_REQUEST_TEMPLATE.md`). Ensure the **Architectural Impact** section is filled out.
4.  **CI Gate:** **Do not request review** until the GitHub Actions workflow (`ci.yml`) shows a successful build, test pass, and formatting confirmation.
5.  **Review Focus:** Reviewers will focus on adherence to **SOLID**, **Type Safety (TypeScript Strict Mode)**, and **Testing Coverage (90%+ mandate)**.

## 5. Security & Integrity Disclosure

If you discover any potential security vulnerability, performance bottleneck, or critical system failure point, **DO NOT** open a public issue or PR immediately.

1.  Follow the guidelines in our **Security Policy** (`.github/SECURITY.md`).
2.  Contact the maintainers privately via the process defined in that document.

Thank you for helping us maintain **CogniFlow** as a zero-error, high-performance productivity tool.
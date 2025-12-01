# Contributing to CogniFlow

First off, thank you for considering contributing to CogniFlow. It's people like you that make open source such a powerful force for innovation. We are committed to building a high-quality, performant, and reliable AI-powered tab organizer, and we welcome your expertise.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue or assessing patches and features.

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for CogniFlow. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

Before creating bug reports, please check the existing [issues](https://github.com/chirag127/CogniFlow-AI-Tab-Organizer-Browser-Extension/issues) as you might find out that you don't need to create one. When you are creating a bug report, please [include as many details as possible](https://github.com/chirag127/CogniFlow-AI-Tab-Organizer-Browser-Extension/blob/main/.github/ISSUE_TEMPLATE/bug_report.md) by filling out the required template.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for CogniFlow, including completely new features and minor improvements to existing functionality. Following these guidelines helps maintainers and the community understand your suggestion and find related suggestions.

### Your First Code Contribution

Unsure where to begin contributing to CogniFlow? You can start by looking through `good first issue` and `help wanted` issues:

- **Good first issues** - issues which should only require a few lines of code, and a test or two.
- **Help wanted issues** - issues which should be a bit more involved than `good first issue` issues.

## Pull Request Process

We adhere to a strict, professional development process to ensure code quality and maintainability. All contributions must be submitted via Pull Requests (PRs).

1.  **Fork & Branch**: Fork the repository and create your branch from `main`. Use a descriptive branch name following this convention: `feature/<feature-name>`, `fix/<issue-number>-<short-description>`, or `docs/<topic>`.

    bash
    git checkout -b feature/new-ai-grouping-algorithm
    

2.  **Set Up the Environment**: Follow the instructions in the `README.md` to set up your local development environment.

3.  **Implement Changes**: Make your changes to the codebase. Adhere to the following principles:
    *   **Code Quality**: Write clean, readable, and maintainable code. Follow SOLID, DRY, and YAGNI principles.
    *   **Architecture**: This project follows the **Feature-Sliced Design (FSD)** pattern. Please place new code in the appropriate layers and slices.
    *   **Code Style**: This project uses **Biome** for linting and formatting. Ensure your code is compliant before committing.

        bash
        # Check and apply formatting/linting fixes
        npx biome check --apply .
        

4.  **Write Tests**: All new features and bug fixes **must** be accompanied by tests. We use:
    *   **Vitest** for unit and integration tests.
    *   **Playwright** for end-to-end tests.

    Run the test suite to ensure your changes haven't introduced regressions.

    bash
    npm test
    

5.  **Commit Your Changes**: We enforce the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. This is critical for automated versioning and changelog generation. Your commit message should be structured as follows:

    
    feat(grouping): add support for context-aware tab grouping
    
    Implemented a new algorithm that leverages the Gemini API to analyze page content for more intelligent grouping. This resolves issue #42.
    
    BREAKING CHANGE: The `groupTabs` function signature has changed.
    
    Common types include: `feat`, `fix`, `build`, `chore`, `ci`, `docs`, `style`, `refactor`, `perf`, `test`.

6.  **Submit a Pull Request**: Push your branch to your fork and open a Pull Request against the `main` branch of the upstream repository. 
    *   Fill out the [Pull Request template](https://github.com/chirag127/CogniFlow-AI-Tab-Organizer-Browser-Extension/blob/main/.github/PULL_REQUEST_TEMPLATE.md).
    *   Ensure all CI checks (GitHub Actions) are passing.
    *   Link the PR to any relevant issues.

7.  **Code Review**: A maintainer will review your PR. Be prepared to address feedback and make changes. Once approved, your contribution will be merged.

Thank you for your contribution!

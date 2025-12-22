# Contributing to CogniFlow-AI-Tab-Organizer-Browser-Extension

We're excited that you're interested in contributing to this project! This document outlines the process for contributing to the CogniFlow AI Tab Organizer.

## Code of Conduct

All contributors are expected to adhere to our [Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md). Please ensure you are familiar with its contents.

## Getting Started

1.  **Fork the Repository:** Create your own fork of the repository to make your changes.
2.  **Clone Your Fork:** `git clone https://github.com/YOUR_USERNAME/CogniFlow-AI-Tab-Organizer-Browser-Extension.git`
3.  **Set Up the Development Environment:**
    *   **Backend:**
        *   Navigate to the `backend` directory: `cd backend`
        *   Install dependencies: `npm install`
        *   Create a `.env` file and add your `CEREBRAS_API_KEY`.
    *   **Extension:**
        *   The extension code is located in the `extension` directory.
        *   Load the extension in your browser in developer mode.

## Making Changes

1.  **Create a Branch:** Create a new branch for your feature or bug fix: `git checkout -b my-awesome-feature`
2.  **Implement Your Changes:** Make your changes to the codebase, following the coding standards outlined below.
3.  **Test Your Changes:** Run the backend tests to ensure your changes haven't introduced any regressions: `npm test --prefix backend`

## Coding Standards

*   **JavaScript:** We use the [Biome](https://biomejs.dev/) code formatter and linter. Please ensure your code is formatted correctly before submitting a pull request.
*   **Commit Messages:** We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

## Submitting a Pull Request

1.  **Push Your Changes:** Push your changes to your fork: `git push origin my-awesome-feature`
2.  **Create a Pull Request:** Open a pull request to the main repository.
3.  **Provide a Clear Description:** In your pull request, provide a clear and concise description of the changes you've made and why they are necessary.

Thank you for your contributions!

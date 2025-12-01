---
name: Bug Report
about: Report a bug to help us improve
title: "[Bug] - "
labels: "bug"
assignees: ""

body:
  - type: markdown
    attributes:
      value: | 
        ## 🚨 Bug Report

        Please provide a clear and concise description of the bug you encountered. This helps us to understand and resolve the issue quickly.

        Thank you for taking the time to report this!

  - type: input
    id: version
    attributes:
      label: Version of CogniFlow-AI-Tab-Organization-Browser-Extension
      description: Please specify the version of the extension you are using. If you don't know, you can usually find it in the extension's details page in your browser.
      placeholder: e.g., 1.2.0
    validations:
      required: true

  - type: input
    id: browser_version
    attributes:
      label: Browser and Version
      description: Please specify the browser (e.g., Chrome, Firefox, Edge) and its exact version.
      placeholder: e.g., Chrome 125.0.6422.113
    validations:
      required: true

  - type: textarea
    id: steps_to_reproduce
    attributes:
      label: Steps to Reproduce
      description: Provide a step-by-step guide to reproduce the bug.
      placeholder: |
        1. Go to...
        2. Click on...
        3. Observe that...
    validations:
      required: true

  - type: textarea
    id: expected_behavior
    attributes:
      label: Expected Behavior
      description: Describe what you expected to happen.
      placeholder: e.g., The tabs should be automatically categorized into 'Work' and 'Personal'.
    validations:
      required: true

  - type: textarea
    id: actual_behavior
    attributes:
      label: Actual Behavior
      description: Describe what actually happened. Be specific!
      placeholder: e.g., The tabs are not categorized, and instead, a console error is displayed.
    validations:
      required: true

  - type: textarea
    id: logs
    attributes:
      label: Console Logs (if applicable)
      description: | 
        If possible, please provide any relevant error messages or logs from the browser's developer console.
        * **How to get logs:**
          1. Open your browser's Developer Tools (usually by pressing F12 or right-clicking and selecting "Inspect" or "Inspect Element").
          2. Go to the "Console" tab.
          3. Try to reproduce the bug.
          4. Copy and paste the *entire* relevant output (especially any red error messages).
        * **Privacy:** Please ensure no sensitive information is leaked.
      placeholder: Paste console logs here...
    validations:
      required: false

  - type: textarea
    id: environment_details
    attributes:
      label: Additional Context / Environment Details
      description: Any other information that might be helpful, such as operating system, screen resolution, specific websites being used, etc.
      placeholder: e.g., Windows 11, using the extension on GitHub.com
    validations:
      required: false

  - type: markdown
    attributes:
      value: | 
        ## 🤖 AI Agent Directives Alignment

        This report is being processed by the Apex Technical Authority's AI agents. Please ensure the above information is structured clearly for automated analysis.

        **Current Tech Stack (Scenario A: Web/Extension):**
        *   **Language:** JavaScript (as per repo context, though TypeScript is preferred for future state)
        *   **Build/Bundler:** Vite
        *   **Extension Framework:** WXT (or similar for cross-browser compatibility)
        *   **AI Model:** Google Gemini 2.0 Flash Lite (as per repo description)
        *   **Testing:** Vitest (Unit), Playwright (E2E)
        *   **Linting:** Biome

# CogniFlow-AI-Tab-Organizer-Browser-Extension

[![Build Status](https://img.shields.io/github/actions/workflow/status/chirag127/CogniFlow-AI-Tab-Organizer-Browser-Extension/ci.yml?branch=main&style=flat-square)](https://github.com/chirag127/CogniFlow-AI-Tab-Organizer-Browser-Extension/actions/workflows/ci.yml)
[![Code Coverage](https://img.shields.io/codecov/c/github/chirag127/CogniFlow-AI-Tab-Organizer-Browser-Extension?style=flat-square)](https://codecov.io/gh/chirag127/CogniFlow-AI-Tab-Organizer-Browser-Extension)
[![Tech Stack](https://img.shields.io/badge/Tech%20Stack-TypeScript%20%7C%20Vite%20%7C%20WXT-blue?style=flat-square)](https://github.com/chirag127/CogniFlow-AI-Tab-Organizer-Browser-Extension)
[![Lint/Format](https://img.shields.io/badge/Lint/Format-Biome-yellow?style=flat-square)](https://github.com/chirag127/CogniFlow-AI-Tab-Organizer-Browser-Extension)
[![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-green?style=flat-square)](https://creativecommons.org/licenses/by-nc/4.0/)
[![GitHub Stars](https://img.shields.io/github/stars/chirag127/CogniFlow-AI-Tab-Organizer-Browser-Extension?style=flat-square)](https://github.com/chirag127/CogniFlow-AI-Tab-Organizer-Browser-Extension)


Intelligently organize browser tabs using AI with CogniFlow. This extension declutters workspaces by automatically grouping tabs and persisting sessions across Chrome, Firefox, and Edge.


## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## Features

-   **AI-Powered Tab Grouping:** Uses Google Gemini to categorize tabs based on content and context.
-   **Cross-Browser Compatibility:** Supports Chrome, Firefox, and Edge.
-   **Session Persistence:** Saves and restores tab sessions.
-   **Manifest V3:** Built for modern browser performance and security.
-   **Customizable Settings:** Adjust AI behavior and grouping preferences.

## Installation

1.  Clone the repository:

    bash
    git clone https://github.com/chirag127/CogniFlow-AI-Tab-Organizer-Browser-Extension.git
    cd CogniFlow-AI-Tab-Organizer-Browser-Extension
    

2.  Install dependencies:

    bash
    npm install
    

3.  Build the extension:

    bash
    npm run build
    

4.  Load the extension in your browser:

    -   **Chrome:**
        -   Go to `chrome://extensions/`
        -   Enable "Developer mode"
        -   Click "Load unpacked" and select the `dist` directory.
    -   **Firefox:**
        -   Go to `about:debugging#/runtime/this-firefox`
        -   Click "Load Temporary Add-on" and select the `dist` directory.
    -   **Edge:**
        -   Go to `edge://extensions/`
        -   Enable "Developer mode"
        -   Click "Load unpacked" and select the `dist` directory.

## Usage

1.  Open the extension popup.
2.  Click "Organize Tabs" to group your tabs automatically.
3.  Customize settings in the options page.

## Development

### Setup

1.  Clone the repository
2.  Install dependencies using `npm install`

### Scripts

| Script        | Description                               |
| ------------- | ---------------------------------------- |
| `npm run dev`   | Start the development server             |
| `npm run build` | Build the extension for production      |
| `npm run lint`  | Lint the code with Biome                |
| `npm run test`  | Run unit tests with Vitest               |
| `npm run e2e`   | Run end-to-end tests with Playwright    |


### Architecture

tree
├── .github
│   └── workflows
│       └── ci.yml
├── src
│   ├── background
│   │   └── index.ts
│   ├── content
│   │   └── index.ts
│   ├── popup
│   │   └── index.tsx
│   └── options
│       └── index.tsx
├── public
│   └── icons
│       └── icon.png
├── manifest.json
├── vite.config.ts
├── tsconfig.json
└── package.json


## Contributing

See [CONTRIBUTING.md](https://github.com/chirag127/CogniFlow-AI-Tab-Organizer-Browser-Extension/blob/main/.github/CONTRIBUTING.md) for details on how to contribute.

## License

This project is licensed under the [CC BY-NC 4.0 License](https://creativecommons.org/licenses/by-nc/4.0/).

<details>
<summary>🤖 AI Agent Directives</summary>

text
## SYSTEM: APEX TECHNICAL AUTHORITY & ELITE ARCHITECT (DECEMBER 2025 EDITION)

### 1. IDENTITY & PRIME DIRECTIVE
**Role:** You are a Senior Principal Software Architect and Master Technical Copywriter with **40+ years of elite industry experience**. You operate with absolute precision, enforcing FAANG-level standards and the wisdom of "Managing the Unmanageable."
**Context:** Current Date is **December 2025**. You are building for the 2026 standard.
**Output Standard:** Deliver **EXECUTION-ONLY** results. No plans, no "reporting"—only executed code, updated docs, and applied fixes.
**Philosophy:** "Zero-Defect, High-Velocity, Future-Proof."

---

### 2. INPUT PROCESSING & COGNITION
*   **SPEECH-TO-TEXT INTERPRETATION PROTOCOL:**
    *   **Context:** User inputs may contain phonetic errors (homophones, typos).
    *   **Semantic Correction:** **STRICTLY FORBIDDEN** from executing literal typos. You must **INFER** technical intent based on the project context.
    *   **Logic Anchor:** Treat the `README.md` as the **Single Source of Truth (SSOT)**.
*   **MANDATORY MCP INSTRUMENTATION:**
    *   **No Guessing:** Do not hallucinate APIs.
    *   **Research First:** Use `linkup`/`brave` to search for **December 2025 Industry Standards**, **Security Threats**, and **2026 UI Trends**.
    *   **Validation:** Use `docfork` to verify *every* external API signature.
    *   **Reasoning:** Engage `clear-thought-two` to architect complex flows *before* writing code.

---

### 3. CONTEXT-AWARE APEX TECH STACKS (LATE 2025 STANDARDS)
**Directives:** Detect the project type (`pyproject.toml`) and apply the corresponding **Apex Toolchain**.
*   **SCENARIO A: WEB / APP / EXTENSION (TypeScript)**
    *   **Stack:** **TypeScript 6.x** (Strict), **Vite 7** (Rolldown), **Tauri v2.x** (Native), **WXT** (Extensions).
    *   **State:** **Signals** (Standardized).
    *   **Lint/Test:** **Biome** (Speed) + **Vitest** (Unit) + **Playwright** (E2E).

---

### 4. AI ORCHESTRATION & GEMINI PROTOCOL (DECEMBER 2025)
**Mandate:** If integrating AI, strictly follow this **Fallback Cascade** for the Google Gemini API.
*   **Tier 1 (Intelligence):** `gemini-3-pro` (Stable Dec 2025) - Multimodal Reasoning.
*   **Tier 2 (Reasoning):** `gemini-2.5-pro` (Legacy Stable) - Deep analysis/STEM.
*   **Tier 3 (Balanced):** `gemini-2.5-flash` - High Volume/Low Latency.
*   **Tier 4 (Speed):** `gemini-2.5-flash-lite` - Cost-efficiency.
*   **Circuit Breaker:** If a model fails (429/500), trigger **Cool-Off** and fallback immediately.
*   **Local AI Emulation:** Utilize Mock AI ...

</details>

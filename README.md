# CogniFlow: AI-Powered Tab Organizer Browser Extension

![CogniFlow Logo Placeholder](https://placehold.co/600x200/0F172A/FFFFFF?text=CogniFlow+-+Intelligent+Workspace+Management)

**CogniFlow** utilizes the Google Gemini API to intelligently categorize, group, and persist browser tabs, transforming chaotic browsing sessions into structured, context-aware workspaces. Built upon Manifest V3, it ensures modern security and performance across Chrome, Firefox, and Edge environments using the WXT framework.

---

## ✨ Status & Core Metrics

[![Build Status](https://img.shields.io/github/actions/workflow/status/chirag127/CogniFlow-AI-Tab-Organizer-Browser-Extension/ci.yml?label=Build&style=flat-square)](https://github.com/chirag127/CogniFlow-AI-Tab-Organizer-Browser-Extension/actions/workflows/ci.yml)
[![Code Coverage](https://img.shields.io/codecov/c/github/chirag127/CogniFlow-AI-Tab-Organizer-Browser-Extension?token=PLACEHOLDER_TOKEN&style=flat-square)](https://codecov.io/gh/chirag127/CogniFlow-AI-Tab-Organizer-Browser-Extension)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript%206.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Framework](https://img.shields.io/badge/Framework-WXT%20v2-purple?style=flat-square&logo=vite)](https://wxt.dev/)
[![Linter](https://img.shields.io/badge/Linter-Biome-green?style=flat-square&logo=biome)](https://biomejs.dev/)
[![License](https://img.shields.io/badge/License-CC%20BY--NC%204.0-orange?style=flat-square)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/chirag127/CogniFlow-AI-Tab-Organizer-Browser-Extension?style=flat-square)](https://github.com/chirag127/CogniFlow-AI-Tab-Organizer-Browser-Extension)

> 🚀 **Star ⭐ this Repo** if you are ready to reclaim your digital workspace efficiency!

---

## 🧠 Architecture Overview

CogniFlow adheres to a modular architecture suitable for high-performance extensions, separating UI, Logic, and API Integration cleanly.

ascii
CogniFlow Architecture (MV3 Extension Pattern)

[ Browser Environment ]
    ├── Background Service Worker (Session Persistence, State Mgmt)
    │       └── /
    │           └── API Gateway (Gemini Abstraction Layer)
    │               └── /
    │                   └── Core AI Processor (Classification/Grouping Logic)
    │                           └── /
    │                               └── Data Store (Runtime/Sync)
    │
    └── Content/Popup UI (Vite/React/Signals)
            └── Tab Interaction Module (Input Capture)


## 📋 Table of Contents

1.  [Status & Core Metrics](#-status--core-metrics)
2.  [Architecture Overview](#-architecture-overview)
3.  [Table of Contents](#-table-of-contents)
4.  [Key Features](#-key-features)
5.  [Technology Stack](#-technology-stack)
6.  [Development & Setup](#-development--setup)
7.  [AI Agent Directives (Apex Protocol)](#-ai-agent-directives-apex-protocol)
8.  [Contributing](#-contributing)
9.  [License](#-license)

## 🔑 Key Features

*   **AI-Powered Categorization:** Leverages Gemini Pro to analyze open tab URLs and titles, assigning dynamic, context-relevant group names (e.g., "Q4 Planning," "Technical Research").
*   **Session Persistence:** Automatically saves and restores complex tab groups across application restarts.
*   **Cross-Browser Compatibility:** Built using WXT for seamless deployment targeting Chrome, Firefox, and Edge leveraging Manifest V3 standards.
*   **Privacy-First Design:** Sensitive data handling is minimized; API interactions are abstracted to protect user browsing context where possible.
*   **Low Latency Interface:** Frontend optimized via Vite and Signals for a responsive user experience, despite network calls to the Gemini API.

## 🛠️ Technology Stack

This project enforces **FAANG-level standards** utilizing the Apex Toolchain for Late 2025 Readiness:

| Component | Technology | Rationale |
| :--- | :--- | :--- |
| Language | TypeScript 6.x | Strict typing, enhanced developer velocity. |
| Build Tool | Vite 7 | Near-instantaneous HMR and optimized bundling. |
| Extension Framework | WXT | Unified API and build system for cross-browser support. |
| State Management | Preact/Signals | Lightweight, fine-grained reactivity for UI updates. |
| Linting/Formatting | Biome | Unified, high-speed toolchain for linting and formatting. |
| E2E Testing | Playwright | Robust, cross-browser end-to-end verification. |
| AI Backend | Google Gemini API | State-of-the-art reasoning engine for classification. |

## 🚀 Development & Setup

Follow the standard Apex setup procedure to initialize the environment.

1.  **Clone Repository:**
    bash
    git clone https://github.com/chirag127/CogniFlow-AI-Tab-Organizer-Browser-Extension.git
    cd CogniFlow-AI-Tab-Organizer-Browser-Extension
    

2.  **Install Dependencies (Using `uv` principles for dependency resolution clarity):**
    bash
    npm install
    # OR using uv style dependency management for future adoption
    # uv sync
    

3.  **Environment Configuration:**
    Create a `.env` file in the root directory and add your secret key:
    
    GEMINI_API_KEY="YOUR_API_KEY_HERE"
    

4.  **Execution Scripts:**

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts development server with HMR (e.g., Chrome).
| `npm run build` | Compiles production assets for all targets.
| `npm test:unit` | Runs Vitest unit tests.
| `npm test:e2e` | Executes Playwright end-to-end scenarios.
| `npm run lint` | Runs Biome checks across the codebase.

## 🤖 AI Agent Directives (Apex Protocol)

<details>
<summary>Click to review Apex Architectural Alignment & Verification Commands (Dec 2025)</summary>

# SYSTEM: APEX TECHNICAL AUTHORITY & ELITE ARCHITECT (DECEMBER 2025 EDITION)

## 1. IDENTITY & PRIME DIRECTIVE
**Role:** You are a Senior Principal Software Architect and Master Technical Copywriter with **40+ years of elite industry experience**. You operate with absolute precision, enforcing FAANG-level standards and the wisdom of "Managing the Unmanageable."
**Context:** Current Project: `CogniFlow-AI-Tab-Organizer-Browser-Extension`. **Stack:** TypeScript 6.x, Vite 7, WXT, Gemini API.
**Output Standard:** Deliver **EXECUTION-ONLY** results.
**Philosophy:** "Zero-Defect, High-Velocity, Future-Proof."

--- 

## 2. INPUT PROCESSING & COGNITION (TypeScript/WXT Focus)
* **SPEECH-TO-TEXT INTERPRETATION PROTOCOL:**
    * **Semantic Correction:** Correct phonetic errors based on TypeScript, WXT, or Gemini API context.
    * **Logic Anchor:** Treat the **`package.json`** and **`tsconfig.json`** as the SSOT for dependency and configuration checks.
* **MANDATORY MCP INSTRUMENTATION:**
    * **No Guessing:** Verify all WXT context processors and API calls.
    * **Research First:** Use `linkup`/`brave` to search for **Manifest V3 security advisories** and **Gemini API response schema changes (Post-Q3 2025)**.
    * **Validation:** Use `docfork` to verify **Vite 7** configuration compatibility.
    * **Reasoning:** Engage `clear-thought-two` to architect the Service Worker/UI data flow using **Signals** before writing state logic.

--- 

## 3. CONTEXT-AWARE APEX TECH STACKS (LATE 2025 STANDARDS)
**Project Type:** Web Extension (TypeScript).
* **Stack Enforcement:** **TypeScript 6.x (Strict Mode Required)**, **Vite 7**, **WXT**, State via **Signals**.
* **API Interaction Pattern:** All Gemini calls MUST route through a dedicated `GeminiService` abstraction layer to facilitate easy Tiered Fallback (see AI Orchestration).

--- 

## 4. AI ORCHESTRATION & GEMINI PROTOCOL (DECEMBER 2025)
**Mandate:** Strictly follow the **Fallback Cascade** for the Google Gemini API.
* **Tier 1 (Intelligence):** `gemini-3-pro` (Stable Dec 2025) - Used for complex, multi-tab grouping rationale.
* **Tier 2 (Reasoning):** `gemini-2.5-pro` - Used for initial context extraction from titles/URLs.
* **Tier 3 (Balanced):** `gemini-2.5-flash` - Used for simple categorization requests (low-cost).
* **Tier 4 (Speed):** `gemini-2.5-flash-lite` - **FORBIDDEN** in this project; latency must prioritize accuracy for user workflow.
* **Circuit Breaker:** If Tier 1 or 2 returns non-JSON or error, log failure to monitoring and fall back to the **Local Session Save** (persistence layer).

## 5. ARCHITECTURAL VERIFICATION
*   **SOLID Compliance:** Ensure Dependency Inversion Principle (DIP) is applied to the `GeminiService`.
*   **DRY Enforcement:** Tab processing utilities must be centralized and imported, not duplicated in UI and Background scripts.
*   **Testing Verification:** Unit tests must mock the Gemini API responses comprehensively.

## 6. VERIFICATION COMMANDS
*   `npm run lint` (Verify Biome adherence)
*   `npm test:unit` (Verify Signal integrity and service abstraction)
*   `npm test:e2e` (Verify cross-browser load sequence via Playwright)

</details>

## 🤝 Contributing

We welcome contributions that enhance performance, security, or AI utility. Please adhere to the [CONTRIBUTING.md](.github/CONTRIBUTING.md) guidelines.

## ⚖️ License

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International License**. See the [LICENSE](LICENSE) file for details.

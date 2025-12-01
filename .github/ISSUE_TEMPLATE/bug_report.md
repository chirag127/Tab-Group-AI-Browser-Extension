--- 
name: "🐞 Bug Report"
about: Report a defect that prevents CogniFlow from functioning as expected. 
title: "[BUG]: Short, descriptive summary of the issue"
labels: ["bug", "triage/needs-review"]
assignees: []
---

## 🛑 Critical Security Warning

Before submitting, **NEVER** include sensitive information like API keys, personal user data, or full session tokens in this report. If the issue is security-sensitive, please report it privately via the process outlined in [SECURITY.md](https://github.com/chirag127/CogniFlow-AI-Tab-Organizer-Browser-Extension/blob/main/.github/SECURITY.md).

## 1. Environment Details

Please provide comprehensive details about your setup.

*   **Browser:** [e.g., Chrome 129, Firefox 130, Edge 128]
*   **Operating System:** [e.g., macOS Sonoma 14.5, Windows 11, Ubuntu 24.04]
*   **CogniFlow Version:** [e.g., v1.2.0 or specify commit hash if building from source]
*   **Installation Method:** [e.g., Chrome Web Store, Local Build (WXT/Vite)]
*   **Manifest Version:** (Should be V3)

## 2. Description of the Bug

A clear and concise description of what the bug is. Why is this behavior incorrect?

## 3. Steps to Reproduce

**CRITICAL:** Steps must be precise and repeatable. Use numbered steps.

1.  [Step 1]
2.  [Step 2]
3.  [Step 3]
4.  ...

### 3.1. Expected Behavior

A clear and concise description of what you expected to happen. (e.g., "Tabs should be grouped under a topic called 'Research'" or "The extension popup should load instantly.").

### 3.2. Actual Behavior

A clear and concise description of what actually happened. (e.g., "All tabs remained ungrouped, and the extension threw an error 500 in the console.").

## 4. Diagnostics & Logs

Please include relevant technical output to help diagnosis.

### 4.1. Browser Console Errors (Mandatory for Extensions)

1.  Open the Extension Service Worker/Background Script console.
2.  Reproduce the issue.
3.  Copy and paste **full stack traces** of any errors.


[Paste relevant console errors here, including timestamps if available]


### 4.2. Gemini API Interaction (If applicable)

If the bug relates to AI functionality (e.g., poor grouping quality, rate limiting, or failed classification):

*   Which Gemini API Model were you using (e.g., `gemini-2.5-flash`)?
*   Did you observe any specific HTTP error codes (e.g., 429, 400, 500) related to the AI endpoint?

## 5. Visual Proof (If Possible)

Screenshots or screen recordings are incredibly helpful for UI/UX related defects.

*   [Attach relevant screenshots or links to videos/GIFs here]

## 6. Architectural Context

If you are a contributor and have insights into the code path:

*   Which module or component do you suspect is related (e.g., `src/background/ai-service.ts`, `src/popup/tab-view.tsx`)?
*   Are there any known race conditions or dependency issues?

---
Thank you for helping us maintain the high standard of the **CogniFlow-AI-Tab-Organizer-Browser-Extension** project.
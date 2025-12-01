# Security Policy for CogniFlow-AI-Tab-Organizer-Browser-Extension

As an Apex Technical Authority project, security is paramount. This repository adheres to the highest standards of security posture, leveraging Manifest V3 requirements and modern dependency management practices.

## 1. Supported Versions

This project follows a strict, forward-looking policy. We only actively support the latest stable release train for all primary dependencies (TypeScript, Vite, WXT, Gemini API integration).

**If you are using a version older than the latest stable release, please upgrade before reporting issues.**

## 2. Vulnerability Reporting

We welcome responsible disclosure of security vulnerabilities. Please follow the process outlined below to ensure prompt and secure remediation.

### A. Private Disclosure (Recommended)

If you discover a vulnerability that could lead to unauthorized access, data leakage, or compromise of user environments (especially concerning the Gemini API key handling or extension storage):

1.  **Do not create a public issue or pull request.**
2.  Send an encrypted email detailing the vulnerability, including steps to reproduce, to the security contact address: `security@chirag127.dev` (Note: This is a placeholder; actual contact should be configured via GitHub Security Advisories).
3.  If GitHub Security Advisories are enabled for this repository, please use the **"Report a vulnerability"** feature provided by GitHub.

We aim to respond to all private disclosures within **48 hours**.

### B. Public Disclosure

Public disclosure (e.g., opening an issue) is only recommended after a reasonable patch window (defined below) has passed, or if the vulnerability is actively being exploited in the wild and remediation is urgently required.

## 3. Patch and Remediation Policy

Upon receiving a valid vulnerability report, we adhere to the following timeline:

| Phase | Target Duration | Action |
| :--- | :--- | :--- |
| **Triage & Confirmation** | 24 Hours | Verify the report's validity. |
| **Fix Development** | 7 Days | Architect and implement the necessary patch (e.g., dependency upgrade, code change). |
| **Internal Testing** | 2 Days | Verify fix using Playwright E2E suite and Biome validation. |
| **Coordinated Release** | 5 Days | Deploy the fix via a new stable release version. |

**Total Time to Patch (TTP):** Maximum of **14 Days** from confirmed report.

## 4. Security Best Practices for CogniFlow

Due to the nature of this browser extension and its reliance on external APIs (Gemini):

1.  **API Key Management:** All processes must strictly adhere to Manifest V3 Service Worker isolation. **Under no circumstances** should the Gemini API Key be hardcoded or stored insecurely in client-side JavaScript bundles. All API calls must be proxied or securely managed within the background service worker.
2.  **Input Sanitization:** All data processed via the Gemini API must be treated as untrusted input when reflected back into the DOM. Utilize safe DOM APIs (e.g., `textContent` over `innerHTML` where appropriate) to mitigate XSS risks.
3.  **Dependency Auditing:** Continuous monitoring is enforced via `.github/workflows/ci.yml`. Any dependency flagged by `npm audit` above 'low' severity will halt CI until resolved or explicitly waived by the Apex Authority.
4.  **Manifest V3 Compliance:** The extension is built entirely within MV3 specifications, ensuring proper Content Security Policy (CSP) configurations and worker lifecycle management.
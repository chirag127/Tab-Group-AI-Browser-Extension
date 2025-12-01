# Security Policy

## Supported Versions

We are committed to maintaining a secure and reliable application. The following versions are actively supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| **Latest** | :white_check_mark: Yes |

Older versions are not supported and may contain vulnerabilities. Please upgrade to the latest version.

## Reporting a Vulnerability

We take security vulnerabilities very seriously. If you discover a security issue, please report it responsibly via the following methods:

1.  **Email:** Send an encrypted email to `security@example.com` (replace with actual security contact if available).
    *   Subject: `Security Vulnerability Report - [Project Name]`
    *   Include details about the vulnerability, affected versions, and steps to reproduce.
    *   We will acknowledge receipt of your email within 48 hours.

2.  **GitHub Security Advisories:** If applicable, you can submit a private security vulnerability report through GitHub's Security Advisory feature.

We will NOT ask you to file security bugs as regular GitHub Issues. We will respond to your report within 48 hours and aim to provide a patch, release, or other fix as quickly as possible. You will be informed when and how the vulnerability has been resolved. We appreciate your efforts to help us improve our security.

## Vulnerability Disclosure Policy

We encourage responsible disclosure of security vulnerabilities. Upon receiving a report, we will:

*   Acknowledge your submission promptly.
*   Investigate the reported issue thoroughly.
*   Work to fix the vulnerability as quickly as possible.
*   Notify you when a fix has been implemented.
*   Give credit to the reporter once the vulnerability is publicly disclosed (if desired by the reporter).

We will not pursue legal action against individuals who:

*   Report vulnerabilities in good faith.
*   Provide us with reasonable time to fix the issue before making any public disclosure.
*   Do not exploit the vulnerability beyond what is necessary to demonstrate its existence.

## Security Best Practices

*   **API Keys & Secrets:** Never commit API keys, passwords, or other sensitive credentials directly into the codebase. Use environment variables or a secure secrets management system.
*   **Dependency Management:** Regularly update project dependencies to their latest stable versions to incorporate security patches. Use tools like `npm audit`, `pip-audit`, or `cargo audit` to check for known vulnerabilities.
*   **Input Validation:** Always validate and sanitize user-provided input to prevent common attacks like Cross-Site Scripting (XSS) and SQL Injection.
*   **Rate Limiting:** Implement appropriate rate limiting on API endpoints to prevent abuse and denial-of-service attacks.
*   **Least Privilege:** Adhere to the principle of least privilege for all system access and permissions.

## Reporting Non-Security Issues

For bugs or feature requests that are not security-related, please use the standard GitHub Issue tracker.

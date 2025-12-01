# Pull Request Template

## ✨ What's New?

*(Please provide a concise summary of your changes. What problem does this PR solve? What new functionality does it introduce?)*

## 🚀 Key Changes

*   *(Bullet point 1: Describe a significant change)*
*   *(Bullet point 2: Describe another significant change)*
*   *(Add more bullet points as needed)*

## 🎯 Target Audience

*(Who is this change primarily for? Developers, End-users, specific modules?)*

## 🛠️ Technical Details

*(Provide any relevant technical context. If this involves specific architectural patterns, dependencies, or complex logic, detail it here.)*

## 🧪 How to Test

*(Provide clear, step-by-step instructions on how to test your changes. Include any necessary setup or specific scenarios to verify functionality.)*

1.  *(Step 1)*
2.  *(Step 2)*
3.  *(Step 3)*

## 🔗 Related Issues/Discussions

*(Link to any related GitHub Issues, Pull Requests, or Discussions using `Closes #<issue_number>` or `Ref #<issue_number>`)*

*   Closes #

## 🌟 Developer Checklist

*   [ ] My code adheres to the project's **Apex Technical Authority** standards.
*   [ ] I have performed a self-review of my own code.
*   [ ] I have commented my code, particularly in hard-to-understand areas.
*   [ ] I have made corresponding changes to the documentation (if applicable).
*   [ ] My changes generate no new warnings or errors.
*   [ ] I have added tests that prove my fix is effective or that my feature works.
*   [ ] New and existing unit tests pass locally with my changes.
*   [ ] Any dependent changes have been merged and published.
*   [ ] I have checked the **AI Agent Directives** in `.github/AGENTS.md` and ensured my changes align.

## 🚀 AI Agent Directives Alignment

*(This section is auto-generated or to be verified against the latest `.github/AGENTS.md`. Ensure your changes respect the defined architectural patterns, toolchain configurations, and verification commands.)*

*   **Tech Stack Adherence:** TypeScript, Vite, WXT, Biome, Playwright, Gemini API integration.
*   **Architectural Patterns:** Manifest V3 Compliance, Feature-Sliced Design principles (if applicable).
*   **Verification:** Changes should pass Biome linting and Vitest unit tests. E2E tests via Playwright should be considered for critical flows.
*   **AI Integration:** Changes involving Gemini API must use the defined fallback cascade (Gemini 3 Pro primary) and handle rate limiting gracefully.

---
Here is the **Product Requirements Document (PRD)** for the browser extension **Tab Group AI**:

---

# 🧠 **Product Requirements Document (PRD)**
## Product Name: **Tab Group AI**
**Author:** `chirag127`
**Version:** 1.0
**Last Updated:** 2025-04-09

---

## 🔍 Overview
**Tab Group AI** is a cross-browser extension that automatically categorizes open tabs into intelligently grouped categories (e.g., *Work Research*, *Shopping*, *Social Media*) using **Gemini 2.0 Flash Lite** for AI-powered tab content analysis.

The extension enhances tab management and productivity by reducing clutter and helping users contextually switch between tasks.

---

## 🎯 Goals
- Group browser tabs using AI based on content, title, and URL.
- Provide a collapsible UI interface to view and manage tab groups.
- Support Chrome, Firefox, and Edge browsers using **Manifest V3**.
- Integrate Gemini 2.0 Flash Lite for tab categorization logic.
- Ensure full persistence, session recovery, and group management.

---

## 🧱 Tech Stack

| Layer         | Technology                               |
|---------------|-------------------------------------------|
| Frontend      | HTML, CSS, JavaScript (Manifest V3)       |
| Backend       | Node.js, Express.js                       |
| AI Integration| Gemini 2.0 Flash Lite API     |
| Storage       | Chrome Storage API (local + sync)         |
| Auth (future) | OAuth2 for syncing across devices (optional) |

---

## 📁 Project Structure

```
tab-group-ai/
├── extension/
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   ├── styles.css
│   ├── icons/
│   ├── groupManager.js
│   ├── aiCategorizer.js
│   └── utils/
│       └── storage.js
│       └── tabUtils.js
├── backend/
│   ├── index.js
│   ├── routes/
│   │   └── categorize.js
│   ├── services/
│   │   └── gemini.js
│   ├── utils/
│   │   └── logger.js
│   ├── .env
│   └── README.md
├── README.md
└── LICENSE
```

---

## ⚙️ Core Features

### 1. **AI Tab Categorization**
- Automatically fetches title, URL, and content from each tab.
- Sends batched tab metadata to backend.
- Gemini Flash Lite API returns predicted categories.
- Groups tabs visually in the UI.

### 2. **Collapsible Tab Group UI**
- Groups displayed as cards or accordion-style containers.
- Each group can be renamed or collapsed.
- Drag & drop support for reorganizing tabs.

### 3. **Session Persistence**
- Saves tab group structure on browser shutdown.
- Restores tab groups on browser restart using Chrome Storage API.

### 4. **Manual Override**
- User can override the category.
- Option to lock tabs into a fixed group.

### 5. **Dark Mode & Themes**
- Modern minimalist UI with light/dark support using CSS variables.

---

## 🧠 AI Model Usage

### Input to Gemini Flash Lite API:
```json
{
  "tabs": [
    { "title": "YouTube - LoFi", "url": "https://youtube.com/watch?v=xyz", "content": "..." },
    { "title": "MDN Web Docs", "url": "https://developer.mozilla.org/...", "content": "..." }
  ]
}
```

### Output:
```json
{
  "groups": {
    "Entertainment": [0],
    "Web Development": [1]
  }
}
```

- Uses Gemini's zero-shot classification.
- Model tuned to label tabs into predefined and emerging categories.

---

## 📱 UI/UX Design

### Popup UI (HTML + CSS)
- Clean, collapsible accordion layout.
- Each group has:
  - Title (editable)
  - List of tabs (favicon, title, close button)
  - Collapse/Expand toggle
- Refresh Button (re-categorize tabs)
- Settings (theme, persistent storage toggle)

### Icon
- Light and Dark mode icons
- Tooltip: “AI Tab Organizer”

---

## 🔐 Security & Permissions

```json
"permissions": [
  "tabs",
  "storage",
  "activeTab",
  "scripting"
],
"host_permissions": [
  "<all_urls>"
]
```

- Only fetches tab titles, URLs, and optional page text (via scripting).
- Does **not** collect user credentials or sensitive data.
- All data stays local except metadata sent to Gemini backend.

---

## 🌍 Browser Compatibility

| Browser | Support      |
|---------|--------------|
| Chrome  | ✅ Full       |
| Edge    | ✅ Full       |
| Firefox| ✅ With MV3   |

---

## 🧪 Testing Plan

- Unit tests for backend routes (Jest)
- Mock Gemini API responses
- Manual and automated tab scenario testing
- Extension testing in Chrome, Edge, Firefox
- Load testing backend for 100+ tabs

---

## 🧾 Deliverables

- Fully functional browser extension (MV3)
- Express.js backend server
- Gemini API integration (zero-shot classification)
- Extension icon set (128x128, 48x48, 16x16)
- Complete README with install & usage guide
- GitHub repo: `chirag127/tab-group-ai`

---

## 📈 Future Enhancements (Post-MVP)
- Account syncing via OAuth (Google/Microsoft)
- Shared tab group export/import
- Productivity analytics (time per tab, usage trends)
- Auto-close stale tabs
- ML fine-tuning with user feedback

---

## 🧪 Success Criteria

- 🚀 < 1s categorization delay for up to 20 tabs.
- ✅ Accurate AI groupings (80%+ user match rate).
- 💾 Session persistency works across restarts.
- 🌐 Extension works across 3 major browsers.
- 🎨 UI clean, responsive, and intuitive.

---

Next, I’ll begin **full implementation**:
1. Set up GitHub repo: `chirag127/tab-group-ai`
2. Initialize frontend MV3 extension
3. Build backend API with Gemini Flash Lite integration
4. Implement tab capture, group manager, UI
5. Complete end-to-end integration
6. Final testing & documentation
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const fs = require("node:fs");
const mime = require("mime-types");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-lite",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseModalities: [
  ],
  responseMimeType: "text/plain",
};

async function run() {
  const chatSession = model.startChat({
    generationConfig,
    history: [
    ],
  });

  const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
  // TODO: Following code needs to be updated for client-side apps.
  const candidates = result.response.candidates;
  for(let candidate_index = 0; candidate_index < candidates.length; candidate_index++) {
    for(let part_index = 0; part_index < candidates[candidate_index].content.parts.length; part_index++) {
      const part = candidates[candidate_index].content.parts[part_index];
      if(part.inlineData) {
        try {
          const filename = `output_${candidate_index}_${part_index}.${mime.extension(part.inlineData.mimeType)}`;
          fs.writeFileSync(filename, Buffer.from(part.inlineData.data, 'base64'));
          console.log(`Output written to: ${filename}`);
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
  console.log(result.response.text());
}

run();

- Do **not** wait for user confirmation before proceeding with planning or implementation.
- Begin execution immediately and proceed from **A to Z**, completing all aspects of the project without leaving any parts for future development.
- Follow **industry-standard coding best practices** including clean code, modularity, proper error handling, reusable components, security, and scalability.
- Use the **latest stable versions** of all programming languages, frameworks, and libraries.
- Structure code and files according to modern conventions with proper naming, separation of concerns, and environment configuration.
- Use GitHub username `chirag127` when initializing, configuring repositories, or pushing code.
- Perform **web search autonomously** whenever needed to resolve implementation details, debug issues, or understand library updates/documentation.
- If a tool input exceeds limitations, **split the input** into smaller parts, **invoke the tool multiple times**, and **aggregate the results** into a coherent, logical, and well-structured output.
- **Rephrase or restructure** combined tool outputs for clarity, logic, and consistency when needed.
- Use **sequential thinking MCP server** extensively for step-by-step planning, workflow breakdowns, dependency resolution, and optimal execution ordering.
- Do **not** defer tasks or include future "TODO" notes—every deliverable must be fully implemented and production-ready.
- Provide **comprehensive documentation** including README files, and API documentation where applicable.
- Ensure all documentation is clear, concise, and easy to follow.
- Use **Hyperbrowser** for all web-related tasks like web scraping, data extraction, and API interactions while respecting robots.txt.
- Use **firecrawler** for all web crawling tasks and API interactions, ensuring best practices and robots.txt compliance.
- Perform **self-code reviews** to ensure code is clean, efficient, and adheres to best practices before finalizing.
- Always test the complete project at the end to ensure it functions without errors.
- Avoid placeholder code unless immediately expanded into full implementations.
- Execute projects fully rather than providing partial or incomplete solutions.
- Avoid code duplication by building upon existing implementations.
- Ensure code is as **modular** as possible for reusability and maintainability.
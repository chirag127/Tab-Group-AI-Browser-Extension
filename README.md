# Tab Group AI

Tab Group AI is a cross-browser extension that automatically categorizes open tabs into intelligently grouped categories (e.g., _Work Research_, _Shopping_, _Social Media_) using **Gemini 2.0 Flash Lite** for AI-powered tab content analysis.

The extension enhances tab management and productivity by reducing clutter and helping users contextually switch between tasks.

## Features

-   **AI Tab Categorization**: Automatically groups tabs based on content, title, and URL
-   **Collapsible Tab Group UI**: Clean, modern interface for managing tab groups
-   **Session Persistence**: Saves tab groups between browser sessions
-   **Manual Override**: Rename groups or move tabs between groups
-   **Dark Mode & Themes**: Modern UI with light/dark support
-   **Cross-Browser Support**: Works on Chrome, Firefox, and Edge (Manifest V3)

## Installation

### From Web Store (Coming Soon)

-   Chrome Web Store: [Link will be available soon]
-   Firefox Add-ons: [Link will be available soon]
-   Microsoft Edge Add-ons: [Link will be available soon]

### Manual Installation (Developer Mode)

#### Chrome / Edge

1. Download or clone this repository
2. Open Chrome/Edge and navigate to `chrome://extensions` or `edge://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the `extension` folder from this repository

#### Firefox

1. Download or clone this repository
2. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
3. Click "Load Temporary Add-on" and select the `manifest.json` file from the `extension` folder

## Backend Setup

The extension requires a backend server for AI categorization:

1. Navigate to the `backend` folder
2. Create a `.env` file based on `.env.example` and add your Gemini API key
3. Install dependencies: `npm install`
4. Start the server: `npm start`

For production, deploy the backend to a cloud provider like Heroku, Vercel, or AWS.

## Usage

1. Click the Tab Group AI icon in your browser toolbar
2. The extension will automatically categorize your open tabs
3. Expand/collapse groups to manage your tabs
4. Drag and drop tabs between groups to reorganize
5. Click on a tab to switch to it, or the X to close it
6. Use the refresh button to re-categorize tabs
7. Access settings via the gear icon

## Development

### Extension

The extension is built using vanilla JavaScript, HTML, and CSS with Manifest V3 compatibility.

```
extension/
├── manifest.json      # Extension configuration
├── popup.html         # Main UI
├── popup.js           # UI logic
├── styles.css         # Styling
├── background.js      # Background script
├── contentScript.js   # Content script for tab analysis
├── groupManager.js    # Tab group management
├── aiCategorizer.js   # AI categorization logic
├── icons/             # Extension icons
└── utils/             # Utility functions
    ├── storage.js     # Storage management
    └── tabUtils.js    # Tab operations
```

### Backend

The backend is built with Node.js and Express, using the Gemini API for AI categorization.

```
backend/
├── index.js           # Main server file
├── package.json       # Dependencies
├── .env               # Environment variables
├── routes/            # API routes
│   └── categorize.js  # Categorization endpoint
├── services/          # Business logic
│   └── gemini.js      # Gemini API integration
└── utils/             # Utility functions
    └── logger.js      # Logging configuration
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

-   Gemini 2.0 Flash Lite API for AI categorization
-   Chrome Extensions API
-   Firefox WebExtensions API
-   Edge Extensions API

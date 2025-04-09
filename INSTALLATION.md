# Tab Group AI - Installation Guide

This guide will help you set up and install the Tab Group AI browser extension and its backend server.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- A modern web browser (Chrome, Firefox, or Edge)
- A Gemini API key (get one from [Google AI Studio](https://ai.google.dev/))

## Backend Setup

1. Navigate to the `backend` folder:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```

4. Edit the `.env` file and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

5. Start the backend server:
   ```
   npm start
   ```

   The server should start on port 3000 (or the port specified in your `.env` file).

6. Test the backend (optional):
   ```
   node test.js
   ```

## Extension Installation

### Chrome / Edge

1. Open Chrome or Edge and navigate to the extensions page:
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`

2. Enable "Developer mode" using the toggle in the top-right corner.

3. Click "Load unpacked" and select the `extension` folder from this repository.

4. The Tab Group AI extension should now appear in your browser toolbar.

### Firefox

1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`.

2. Click "Load Temporary Add-on" and select the `manifest.json` file from the `extension` folder.

3. The Tab Group AI extension should now appear in your browser toolbar.

## Configuration

1. Click on the Tab Group AI icon in your browser toolbar to open the extension popup.

2. Click the settings icon (gear) to access settings.

3. Configure your preferences:
   - Dark Mode: Toggle between light and dark themes
   - Save Groups on Browser Close: Enable/disable session persistence

## Troubleshooting

### Backend Issues

- **Error: GEMINI_API_KEY is not set**
  - Make sure you've created a `.env` file with your API key.

- **Error: Cannot connect to backend**
  - Ensure the backend server is running on the correct port.
  - Check that your firewall isn't blocking the connection.

### Extension Issues

- **Extension not appearing in toolbar**
  - Try reloading the extension from the extensions page.

- **Tabs not being categorized**
  - Check the browser console for errors.
  - Ensure the backend server is running.
  - Verify your Gemini API key is valid.

- **Changes not persisting**
  - Make sure the "Save Groups on Browser Close" option is enabled in settings.

## Updating

To update the extension:

1. Pull the latest changes from the repository.
2. Navigate to the extensions page in your browser.
3. Find Tab Group AI and click "Reload" or the refresh icon.

## Uninstalling

### Chrome / Edge

1. Navigate to the extensions page.
2. Find Tab Group AI and click "Remove".

### Firefox

1. Navigate to `about:addons`.
2. Find Tab Group AI and click "Remove".

## Support

If you encounter any issues, please [open an issue](https://github.com/chirag127/Tab-Group-AI-Browser-Extension/issues) on GitHub.

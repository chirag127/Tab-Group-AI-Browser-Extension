// Tab Group AI - Popup Script
// Handles the popup UI and user interactions

document.addEventListener('DOMContentLoaded', async () => {
  // Initialize components
  await initializePopup();
  
  // Set up event listeners
  setupEventListeners();
});

/**
 * Initialize the popup UI
 */
async function initializePopup() {
  try {
    // Initialize group manager
    await GroupManager.init();
    
    // Load settings and apply theme
    const settings = await StorageUtil.getSettings();
    applyTheme(settings.theme);
    
    // Set settings toggle states
    document.getElementById('theme-toggle').checked = settings.theme === 'dark';
    document.getElementById('persistence-toggle').checked = settings.persistGroups;
    
    // Hide loading indicator
    document.getElementById('loading').classList.add('hidden');
  } catch (error) {
    console.error('Error initializing popup:', error);
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('error-message').classList.remove('hidden');
  }
}

/**
 * Set up event listeners for UI elements
 */
function setupEventListeners() {
  // Refresh button
  document.getElementById('refresh-btn').addEventListener('click', async () => {
    await GroupManager.categorizeTabs();
  });
  
  // Settings button
  document.getElementById('settings-btn').addEventListener('click', () => {
    const settingsPanel = document.getElementById('settings-panel');
    settingsPanel.classList.toggle('hidden');
  });
  
  // Theme toggle
  document.getElementById('theme-toggle').addEventListener('change', async (e) => {
    const theme = e.target.checked ? 'dark' : 'light';
    applyTheme(theme);
    
    // Save setting
    const settings = await StorageUtil.getSettings();
    settings.theme = theme;
    await StorageUtil.saveSettings(settings);
  });
  
  // Persistence toggle
  document.getElementById('persistence-toggle').addEventListener('change', async (e) => {
    const persistGroups = e.target.checked;
    
    // Save setting
    const settings = await StorageUtil.getSettings();
    settings.persistGroups = persistGroups;
    await StorageUtil.saveSettings(settings);
  });
  
  // Close popup when clicking outside of it (for settings panel)
  document.addEventListener('click', (e) => {
    const settingsPanel = document.getElementById('settings-panel');
    const settingsBtn = document.getElementById('settings-btn');
    
    if (!settingsPanel.classList.contains('hidden') && 
        !settingsPanel.contains(e.target) && 
        !settingsBtn.contains(e.target)) {
      settingsPanel.classList.add('hidden');
    }
  });
}

/**
 * Apply theme to the UI
 * @param {string} theme - Theme name ('light' or 'dark')
 */
function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

/**
 * Handle errors in the UI
 * @param {Error} error - Error object
 */
function handleError(error) {
  console.error('Error:', error);
  document.getElementById('loading').classList.add('hidden');
  
  const errorMessage = document.getElementById('error-message');
  errorMessage.textContent = `Error: ${error.message}`;
  errorMessage.classList.remove('hidden');
  
  // Hide error after 5 seconds
  setTimeout(() => {
    errorMessage.classList.add('hidden');
  }, 5000);
}

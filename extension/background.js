// Tab Group AI - Background Script
// Handles background tasks, state management, and communication with the backend.

// --- Constants ---
const API_BASE_URL = 'http://localhost:3000'; // Use environment variables in a real-world scenario
const CATEGORIZATION_ENDPOINT = '/api/categorize';

// --- Utility Functions ---
const log = (level, message, data) => {
  const timestamp = new Date().toISOString();
  console[level](`[${timestamp}] ${message}`, data || '');
};

// --- API Service ---
const apiService = {
  async categorizeTabs(tabs) {
    try {
      const response = await fetch(`${API_BASE_URL}${CATEGORIZATION_ENDPOINT}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tabs }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      log('error', 'API categorization failed:', error);
      throw error; // Rethrow to be handled by the caller
    }
  },
};

// --- Storage Service ---
const storageService = {
  async get(key) {
    return (await chrome.storage.local.get(key))[key];
  },
  async set(key, value) {
    return chrome.storage.local.set({ [key]: value });
  },
  async getSync(key) {
    return (await chrome.storage.sync.get(key))[key];
  },
  async setSync(key, value) {
    return chrome.storage.sync.set({ [key]: value });
  },
};

// --- Core Logic ---
const tabManager = {
  async categorizeAndStoreTabs() {
    const tabs = await chrome.tabs.query({ currentWindow: true });
    const tabData = tabs.map(({ id, title, url, favIconUrl }) => ({ id, title, url, favIconUrl: favIconUrl || '' }));

    if (tabData.length === 0) {
      log('info', 'No tabs to categorize.');
      return { success: true, groups: {} };
    }

    try {
      const result = await apiService.categorizeTabs(tabData);
      const timestamp = new Date().toISOString();
      await storageService.set('tabGroups', result.groups);
      await storageService.set('lastCategorization', timestamp);
      log('info', 'Tabs categorized and stored successfully.');
      return { success: true, groups: result.groups };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async getStoredTabGroups() {
    return (await storageService.get('tabGroups')) || {};
  },

  async updateGroupsOnTabRemove(tabId) {
    const tabGroups = await this.getStoredTabGroups();
    if (!tabGroups) return;

    let isUpdated = false;
    for (const groupName in tabGroups) {
      const initialLength = tabGroups[groupName].length;
      tabGroups[groupName] = tabGroups[groupName].filter(tab => tab.id !== tabId);

      if (tabGroups[groupName].length < initialLength) {
        isUpdated = true;
      }
      if (tabGroups[groupName].length === 0) {
        delete tabGroups[groupName];
      }
    }

    if (isUpdated) {
      await storageService.set('tabGroups', tabGroups);
      log('info', `Tab ${tabId} removed and groups updated.`);
    }
  },
};

// --- Event Listeners ---

// Extension installation or update
chrome.runtime.onInstalled.addListener(() => {
  log('info', 'Extension installed/updated.');
  // Initialize default settings if they don't exist
  storageService.getSync('settings').then(settings => {
    if (!settings) {
      storageService.setSync('settings', {
        theme: 'light',
        persistGroups: true,
      });
    }
  });
});

// Message listener for popup actions
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case 'categorizeTabs':
      tabManager.categorizeAndStoreTabs().then(sendResponse);
      return true; // Indicates async response

    case 'getTabGroups':
      tabManager.getStoredTabGroups().then(groups => sendResponse({ success: true, groups }));
      return true; // Indicates async response

    default:
      log('warn', 'Received unknown message action:', message.action);
      return false;
  }
});

// Tab removal listener
chrome.tabs.onRemoved.addListener((tabId) => {
  tabManager.updateGroupsOnTabRemove(tabId).catch(error => {
    log('error', 'Error updating groups on tab removal:', error);
  });
});

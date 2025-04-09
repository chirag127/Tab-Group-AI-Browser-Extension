// Tab Group AI - Background Script
// Handles background tasks and communication with the backend

// Configuration
const API_BASE_URL = 'http://localhost:3000'; // Change to your deployed backend URL in production
const CATEGORIZATION_ENDPOINT = '/api/categorize';

// Initialize when extension is installed or updated
chrome.runtime.onInstalled.addListener(async () => {
  console.log('Tab Group AI extension installed/updated');
  
  // Initialize storage with default settings
  const defaultSettings = {
    theme: 'light',
    persistGroups: true,
    lastCategorization: null
  };
  
  // Check if settings already exist
  const existingSettings = await chrome.storage.sync.get('settings');
  if (!existingSettings.settings) {
    await chrome.storage.sync.set({ settings: defaultSettings });
    console.log('Default settings initialized');
  }
  
  // Restore tab groups if persistence is enabled
  const { settings } = await chrome.storage.sync.get('settings');
  if (settings.persistGroups) {
    const savedGroups = await chrome.storage.local.get('tabGroups');
    if (savedGroups.tabGroups) {
      console.log('Restoring saved tab groups');
      // We don't actually restore tabs here, just keep the data for the popup
    }
  }
});

// Listen for messages from popup or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'categorizeTabs') {
    categorizeTabs()
      .then(result => sendResponse(result))
      .catch(error => {
        console.error('Error categorizing tabs:', error);
        sendResponse({ success: false, error: error.message });
      });
    return true; // Indicates async response
  }
  
  if (message.action === 'getTabGroups') {
    getTabGroups()
      .then(groups => sendResponse({ success: true, groups }))
      .catch(error => {
        console.error('Error getting tab groups:', error);
        sendResponse({ success: false, error: error.message });
      });
    return true; // Indicates async response
  }
});

// Main function to categorize tabs
async function categorizeTabs() {
  try {
    // Get all tabs in the current window
    const tabs = await chrome.tabs.query({ currentWindow: true });
    
    // Extract relevant tab data
    const tabData = tabs.map(tab => ({
      id: tab.id,
      title: tab.title,
      url: tab.url,
      favIconUrl: tab.favIconUrl || ''
    }));
    
    // Get content from tabs (optional, based on user settings)
    // This would require content script injection for better results
    // For now, we'll just use titles and URLs
    
    // Send data to backend for categorization
    const response = await fetch(`${API_BASE_URL}${CATEGORIZATION_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ tabs: tabData })
    });
    
    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    // Store the categorization result
    await chrome.storage.local.set({ 
      tabGroups: result.groups,
      lastCategorization: new Date().toISOString()
    });
    
    // Update settings with last categorization timestamp
    const { settings } = await chrome.storage.sync.get('settings');
    settings.lastCategorization = new Date().toISOString();
    await chrome.storage.sync.set({ settings });
    
    return { success: true, groups: result.groups };
  } catch (error) {
    console.error('Error in categorizeTabs:', error);
    return { success: false, error: error.message };
  }
}

// Function to get stored tab groups
async function getTabGroups() {
  const data = await chrome.storage.local.get('tabGroups');
  return data.tabGroups || {};
}

// Listen for tab updates to potentially re-categorize
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Only react to complete page loads to avoid excessive categorization
  if (changeInfo.status === 'complete') {
    // We could trigger re-categorization here, but it might be too aggressive
    // Instead, we'll let the user manually refresh categories
  }
});

// Listen for tab removal to update groups
chrome.tabs.onRemoved.addListener(async (tabId, removeInfo) => {
  try {
    const data = await chrome.storage.local.get('tabGroups');
    if (!data.tabGroups) return;
    
    let updated = false;
    
    // Remove the tab from any group it's in
    Object.keys(data.tabGroups).forEach(groupName => {
      const index = data.tabGroups[groupName].findIndex(tab => tab.id === tabId);
      if (index !== -1) {
        data.tabGroups[groupName].splice(index, 1);
        updated = true;
        
        // Remove empty groups
        if (data.tabGroups[groupName].length === 0) {
          delete data.tabGroups[groupName];
        }
      }
    });
    
    if (updated) {
      await chrome.storage.local.set({ tabGroups: data.tabGroups });
    }
  } catch (error) {
    console.error('Error handling tab removal:', error);
  }
});

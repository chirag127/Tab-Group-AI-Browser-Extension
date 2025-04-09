// Tab Group AI - Tab Utility
// Handles tab operations for the extension

const TabUtil = {
  /**
   * Get all tabs in the current window
   * @returns {Promise<Array>} Promise that resolves with array of tabs
   */
  getAllTabs: async function() {
    return chrome.tabs.query({ currentWindow: true });
  },
  
  /**
   * Get a specific tab by ID
   * @param {number} tabId - ID of the tab to get
   * @returns {Promise<Object>} Promise that resolves with tab object
   */
  getTab: async function(tabId) {
    return chrome.tabs.get(tabId);
  },
  
  /**
   * Switch to a specific tab
   * @param {number} tabId - ID of the tab to switch to
   * @returns {Promise} Promise that resolves when tab is activated
   */
  switchToTab: async function(tabId) {
    return chrome.tabs.update(tabId, { active: true });
  },
  
  /**
   * Close a specific tab
   * @param {number} tabId - ID of the tab to close
   * @returns {Promise} Promise that resolves when tab is closed
   */
  closeTab: async function(tabId) {
    return chrome.tabs.remove(tabId);
  },
  
  /**
   * Extract content from a specific tab
   * @param {number} tabId - ID of the tab to extract content from
   * @returns {Promise<Object>} Promise that resolves with extracted content
   */
  extractTabContent: async function(tabId) {
    try {
      // Execute content script to extract content
      const results = await chrome.tabs.sendMessage(tabId, { action: 'extractContent' });
      return results;
    } catch (error) {
      console.error(`Error extracting content from tab ${tabId}:`, error);
      // If content script is not ready or fails, return basic info
      const tab = await this.getTab(tabId);
      return {
        success: false,
        content: {
          title: tab.title,
          url: tab.url
        }
      };
    }
  },
  
  /**
   * Get basic metadata for all tabs
   * @returns {Promise<Array>} Promise that resolves with array of tab metadata
   */
  getTabsMetadata: async function() {
    const tabs = await this.getAllTabs();
    return tabs.map(tab => ({
      id: tab.id,
      title: tab.title,
      url: tab.url,
      favIconUrl: tab.favIconUrl || ''
    }));
  },
  
  /**
   * Check if a tab still exists
   * @param {number} tabId - ID of the tab to check
   * @returns {Promise<boolean>} Promise that resolves with whether tab exists
   */
  tabExists: async function(tabId) {
    try {
      await chrome.tabs.get(tabId);
      return true;
    } catch (error) {
      return false;
    }
  },
  
  /**
   * Filter out tabs that no longer exist from a list
   * @param {Array} tabs - Array of tab objects with id property
   * @returns {Promise<Array>} Promise that resolves with filtered array
   */
  filterExistingTabs: async function(tabs) {
    const existingTabs = [];
    for (const tab of tabs) {
      if (await this.tabExists(tab.id)) {
        existingTabs.push(tab);
      }
    }
    return existingTabs;
  }
};

// Export the utility
window.TabUtil = TabUtil;

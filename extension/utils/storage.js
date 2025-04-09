// Tab Group AI - Storage Utility
// Handles storage operations for the extension

const StorageUtil = {
  /**
   * Save settings to sync storage
   * @param {Object} settings - Settings object to save
   * @returns {Promise} Promise that resolves when settings are saved
   */
  saveSettings: async function(settings) {
    return chrome.storage.sync.set({ settings });
  },
  
  /**
   * Get settings from sync storage
   * @returns {Promise<Object>} Promise that resolves with settings object
   */
  getSettings: async function() {
    const data = await chrome.storage.sync.get('settings');
    return data.settings || {
      theme: 'light',
      persistGroups: true,
      lastCategorization: null
    };
  },
  
  /**
   * Save tab groups to local storage
   * @param {Object} groups - Tab groups object to save
   * @returns {Promise} Promise that resolves when groups are saved
   */
  saveTabGroups: async function(groups) {
    return chrome.storage.local.set({ 
      tabGroups: groups,
      lastUpdated: new Date().toISOString()
    });
  },
  
  /**
   * Get tab groups from local storage
   * @returns {Promise<Object>} Promise that resolves with tab groups object
   */
  getTabGroups: async function() {
    const data = await chrome.storage.local.get(['tabGroups', 'lastUpdated']);
    return {
      groups: data.tabGroups || {},
      lastUpdated: data.lastUpdated || null
    };
  },
  
  /**
   * Clear all stored tab groups
   * @returns {Promise} Promise that resolves when groups are cleared
   */
  clearTabGroups: async function() {
    return chrome.storage.local.remove(['tabGroups', 'lastUpdated']);
  },
  
  /**
   * Update a specific tab group
   * @param {string} groupName - Name of the group to update
   * @param {Array} tabs - Array of tabs in the group
   * @returns {Promise} Promise that resolves when group is updated
   */
  updateTabGroup: async function(groupName, tabs) {
    const { groups } = await this.getTabGroups();
    groups[groupName] = tabs;
    return this.saveTabGroups(groups);
  },
  
  /**
   * Remove a specific tab group
   * @param {string} groupName - Name of the group to remove
   * @returns {Promise} Promise that resolves when group is removed
   */
  removeTabGroup: async function(groupName) {
    const { groups } = await this.getTabGroups();
    if (groups[groupName]) {
      delete groups[groupName];
      return this.saveTabGroups(groups);
    }
    return Promise.resolve();
  },
  
  /**
   * Rename a tab group
   * @param {string} oldName - Current name of the group
   * @param {string} newName - New name for the group
   * @returns {Promise} Promise that resolves when group is renamed
   */
  renameTabGroup: async function(oldName, newName) {
    if (oldName === newName) return Promise.resolve();
    
    const { groups } = await this.getTabGroups();
    if (groups[oldName]) {
      groups[newName] = groups[oldName];
      delete groups[oldName];
      return this.saveTabGroups(groups);
    }
    return Promise.resolve();
  }
};

// Export the utility
window.StorageUtil = StorageUtil;

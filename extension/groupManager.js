// Tab Group AI - Group Manager
// Handles tab group operations and UI management

const GroupManager = {
  // DOM elements
  elements: {
    tabGroups: null,
    loading: null,
    errorMessage: null,
    tabGroupTemplate: null,
    tabItemTemplate: null
  },
  
  // State
  state: {
    groups: {},
    draggedTab: null,
    draggedTabGroup: null
  },
  
  /**
   * Initialize the group manager
   */
  init: async function() {
    // Cache DOM elements
    this.elements.tabGroups = document.getElementById('tab-groups');
    this.elements.loading = document.getElementById('loading');
    this.elements.errorMessage = document.getElementById('error-message');
    this.elements.tabGroupTemplate = document.getElementById('tab-group-template');
    this.elements.tabItemTemplate = document.getElementById('tab-item-template');
    
    // Load existing groups
    await this.loadGroups();
    
    // Set up event delegation for tab groups container
    this.elements.tabGroups.addEventListener('click', this.handleTabGroupsClick.bind(this));
    
    // Set up drag and drop
    this.setupDragAndDrop();
  },
  
  /**
   * Load tab groups from storage
   */
  loadGroups: async function() {
    try {
      this.showLoading();
      
      // Get groups from storage
      const { groups } = await StorageUtil.getTabGroups();
      
      // If no groups or empty, categorize tabs
      if (!groups || Object.keys(groups).length === 0) {
        await this.categorizeTabs();
        return;
      }
      
      // Filter out tabs that no longer exist
      const filteredGroups = {};
      for (const [groupName, tabs] of Object.entries(groups)) {
        const existingTabs = await TabUtil.filterExistingTabs(tabs);
        if (existingTabs.length > 0) {
          filteredGroups[groupName] = existingTabs;
        }
      }
      
      // Update state and render
      this.state.groups = filteredGroups;
      await StorageUtil.saveTabGroups(filteredGroups);
      this.renderGroups();
      
      this.hideLoading();
    } catch (error) {
      console.error('Error loading groups:', error);
      this.showError();
    }
  },
  
  /**
   * Categorize tabs using AI
   */
  categorizeTabs: async function() {
    try {
      this.showLoading();
      
      // Send message to background script to categorize tabs
      const result = await chrome.runtime.sendMessage({ action: 'categorizeTabs' });
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to categorize tabs');
      }
      
      // Update state and render
      this.state.groups = result.groups;
      this.renderGroups();
      
      this.hideLoading();
    } catch (error) {
      console.error('Error categorizing tabs:', error);
      this.showError();
    }
  },
  
  /**
   * Render tab groups to the UI
   */
  renderGroups: function() {
    // Clear existing groups
    this.elements.tabGroups.innerHTML = '';
    
    // If no groups, show message
    if (Object.keys(this.state.groups).length === 0) {
      const noGroupsMessage = document.createElement('div');
      noGroupsMessage.className = 'no-groups-message';
      noGroupsMessage.textContent = 'No tab groups found. Click refresh to categorize tabs.';
      this.elements.tabGroups.appendChild(noGroupsMessage);
      return;
    }
    
    // Render each group
    for (const [groupName, tabs] of Object.entries(this.state.groups)) {
      const groupElement = this.createGroupElement(groupName, tabs);
      this.elements.tabGroups.appendChild(groupElement);
    }
  },
  
  /**
   * Create a group element from template
   * @param {string} groupName - Name of the group
   * @param {Array} tabs - Array of tabs in the group
   * @returns {HTMLElement} Group element
   */
  createGroupElement: function(groupName, tabs) {
    // Clone template
    const template = this.elements.tabGroupTemplate.content.cloneNode(true);
    const groupElement = template.querySelector('.tab-group');
    
    // Set group name
    const groupTitle = groupElement.querySelector('.group-title');
    groupTitle.textContent = groupName;
    
    // Set group icon based on name
    const groupIcon = groupElement.querySelector('.group-icon');
    groupIcon.textContent = this.getGroupIcon(groupName);
    
    // Add tabs to group
    const tabsContainer = groupElement.querySelector('.tabs-container');
    tabs.forEach(tab => {
      const tabElement = this.createTabElement(tab);
      tabsContainer.appendChild(tabElement);
    });
    
    // Set data attribute for group name
    groupElement.dataset.groupName = groupName;
    
    // Add event listener for group title editing
    groupTitle.addEventListener('blur', () => {
      const newName = groupTitle.textContent.trim();
      if (newName && newName !== groupName) {
        this.renameGroup(groupName, newName);
      }
    });
    
    // Prevent Enter key from adding newlines in contenteditable
    groupTitle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        groupTitle.blur();
      }
    });
    
    return groupElement;
  },
  
  /**
   * Create a tab element from template
   * @param {Object} tab - Tab object
   * @returns {HTMLElement} Tab element
   */
  createTabElement: function(tab) {
    // Clone template
    const template = this.elements.tabItemTemplate.content.cloneNode(true);
    const tabElement = template.querySelector('.tab-item');
    
    // Set tab properties
    const favicon = tabElement.querySelector('.tab-favicon');
    favicon.src = tab.favIconUrl || 'icons/default-favicon.png';
    favicon.onerror = () => {
      favicon.src = 'icons/default-favicon.png';
    };
    
    const title = tabElement.querySelector('.tab-title');
    title.textContent = tab.title;
    title.title = tab.title;
    
    // Set data attribute for tab ID
    tabElement.dataset.tabId = tab.id;
    
    return tabElement;
  },
  
  /**
   * Get an emoji icon for a group based on its name
   * @param {string} groupName - Name of the group
   * @returns {string} Emoji icon
   */
  getGroupIcon: function(groupName) {
    const groupIcons = {
      'Work': '💼',
      'Shopping': '🛒',
      'Social Media': '👥',
      'Entertainment': '🎬',
      'News': '📰',
      'Research': '🔍',
      'Development': '💻',
      'Education': '📚',
      'Finance': '💰',
      'Travel': '✈️',
      'Health': '🏥',
      'Technology': '📱',
      'Sports': '⚽',
      'Food': '🍔',
      'Music': '🎵',
      'Art': '🎨',
      'Science': '🔬',
      'Gaming': '🎮',
      'Productivity': '📊',
      'Other': '📌'
    };
    
    // Check if group name contains any of the keywords
    for (const [category, icon] of Object.entries(groupIcons)) {
      if (groupName.toLowerCase().includes(category.toLowerCase())) {
        return icon;
      }
    }
    
    // Default icon
    return '📑';
  },
  
  /**
   * Handle clicks on tab groups container
   * @param {Event} event - Click event
   */
  handleTabGroupsClick: function(event) {
    const target = event.target;
    
    // Handle tab click
    if (target.closest('.tab-item')) {
      const tabItem = target.closest('.tab-item');
      const tabId = parseInt(tabItem.dataset.tabId);
      
      // If close button clicked
      if (target.closest('.close-tab')) {
        this.closeTab(tabId);
        return;
      }
      
      // Otherwise switch to tab
      this.switchToTab(tabId);
      return;
    }
    
    // Handle group header click (collapse/expand)
    if (target.closest('.group-header')) {
      const groupElement = target.closest('.tab-group');
      const toggleButton = target.closest('.toggle-group');
      
      // Only toggle if clicking the toggle button or double-clicking the header
      if (toggleButton || event.detail === 2) {
        this.toggleGroupCollapse(groupElement);
      }
      return;
    }
  },
  
  /**
   * Toggle group collapse state
   * @param {HTMLElement} groupElement - Group element to toggle
   */
  toggleGroupCollapse: function(groupElement) {
    groupElement.classList.toggle('group-collapsed');
  },
  
  /**
   * Switch to a specific tab
   * @param {number} tabId - ID of the tab to switch to
   */
  switchToTab: async function(tabId) {
    try {
      await TabUtil.switchToTab(tabId);
      window.close(); // Close popup after switching
    } catch (error) {
      console.error('Error switching to tab:', error);
      // Remove tab if it doesn't exist
      this.removeTabFromGroups(tabId);
    }
  },
  
  /**
   * Close a specific tab
   * @param {number} tabId - ID of the tab to close
   */
  closeTab: async function(tabId) {
    try {
      await TabUtil.closeTab(tabId);
      this.removeTabFromGroups(tabId);
    } catch (error) {
      console.error('Error closing tab:', error);
      // Remove tab if it doesn't exist
      this.removeTabFromGroups(tabId);
    }
  },
  
  /**
   * Remove a tab from all groups
   * @param {number} tabId - ID of the tab to remove
   */
  removeTabFromGroups: async function(tabId) {
    let updated = false;
    
    // Remove tab from all groups
    for (const groupName in this.state.groups) {
      const index = this.state.groups[groupName].findIndex(tab => tab.id === tabId);
      if (index !== -1) {
        this.state.groups[groupName].splice(index, 1);
        updated = true;
        
        // Remove empty groups
        if (this.state.groups[groupName].length === 0) {
          delete this.state.groups[groupName];
        }
      }
    }
    
    if (updated) {
      // Update storage
      await StorageUtil.saveTabGroups(this.state.groups);
      
      // Re-render groups
      this.renderGroups();
    }
  },
  
  /**
   * Rename a group
   * @param {string} oldName - Current name of the group
   * @param {string} newName - New name for the group
   */
  renameGroup: async function(oldName, newName) {
    if (oldName === newName) return;
    
    // Update state
    this.state.groups[newName] = this.state.groups[oldName];
    delete this.state.groups[oldName];
    
    // Update storage
    await StorageUtil.renameTabGroup(oldName, newName);
    
    // Re-render groups
    this.renderGroups();
  },
  
  /**
   * Set up drag and drop functionality
   */
  setupDragAndDrop: function() {
    // Event delegation for drag events
    this.elements.tabGroups.addEventListener('dragstart', this.handleDragStart.bind(this));
    this.elements.tabGroups.addEventListener('dragover', this.handleDragOver.bind(this));
    this.elements.tabGroups.addEventListener('dragenter', this.handleDragEnter.bind(this));
    this.elements.tabGroups.addEventListener('dragleave', this.handleDragLeave.bind(this));
    this.elements.tabGroups.addEventListener('drop', this.handleDrop.bind(this));
    this.elements.tabGroups.addEventListener('dragend', this.handleDragEnd.bind(this));
  },
  
  /**
   * Handle drag start event
   * @param {DragEvent} event - Drag event
   */
  handleDragStart: function(event) {
    const tabItem = event.target.closest('.tab-item');
    if (!tabItem) return;
    
    // Set dragged tab
    const tabId = parseInt(tabItem.dataset.tabId);
    const groupElement = tabItem.closest('.tab-group');
    const groupName = groupElement.dataset.groupName;
    
    this.state.draggedTab = tabId;
    this.state.draggedTabGroup = groupName;
    
    // Add dragging class
    tabItem.classList.add('dragging');
    
    // Set drag data
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', tabId);
  },
  
  /**
   * Handle drag over event
   * @param {DragEvent} event - Drag event
   */
  handleDragOver: function(event) {
    if (this.state.draggedTab) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }
  },
  
  /**
   * Handle drag enter event
   * @param {DragEvent} event - Drag event
   */
  handleDragEnter: function(event) {
    const groupElement = event.target.closest('.tab-group');
    if (groupElement) {
      groupElement.classList.add('drag-over');
    }
  },
  
  /**
   * Handle drag leave event
   * @param {DragEvent} event - Drag event
   */
  handleDragLeave: function(event) {
    const groupElement = event.target.closest('.tab-group');
    if (groupElement && !groupElement.contains(event.relatedTarget)) {
      groupElement.classList.remove('drag-over');
    }
  },
  
  /**
   * Handle drop event
   * @param {DragEvent} event - Drag event
   */
  handleDrop: async function(event) {
    event.preventDefault();
    
    const groupElement = event.target.closest('.tab-group');
    if (!groupElement) return;
    
    groupElement.classList.remove('drag-over');
    
    const targetGroupName = groupElement.dataset.groupName;
    const tabId = this.state.draggedTab;
    const sourceGroupName = this.state.draggedTabGroup;
    
    if (tabId && sourceGroupName && targetGroupName !== sourceGroupName) {
      // Move tab between groups
      await this.moveTabToGroup(tabId, sourceGroupName, targetGroupName);
    }
  },
  
  /**
   * Handle drag end event
   * @param {DragEvent} event - Drag event
   */
  handleDragEnd: function(event) {
    const tabItem = event.target.closest('.tab-item');
    if (tabItem) {
      tabItem.classList.remove('dragging');
    }
    
    // Reset state
    this.state.draggedTab = null;
    this.state.draggedTabGroup = null;
    
    // Remove drag-over class from all groups
    document.querySelectorAll('.tab-group').forEach(group => {
      group.classList.remove('drag-over');
    });
  },
  
  /**
   * Move a tab from one group to another
   * @param {number} tabId - ID of the tab to move
   * @param {string} sourceGroupName - Name of the source group
   * @param {string} targetGroupName - Name of the target group
   */
  moveTabToGroup: async function(tabId, sourceGroupName, targetGroupName) {
    // Find tab in source group
    const sourceGroup = this.state.groups[sourceGroupName];
    const tabIndex = sourceGroup.findIndex(tab => tab.id === tabId);
    
    if (tabIndex === -1) return;
    
    // Get tab object
    const tab = sourceGroup[tabIndex];
    
    // Remove from source group
    sourceGroup.splice(tabIndex, 1);
    
    // Add to target group
    if (!this.state.groups[targetGroupName]) {
      this.state.groups[targetGroupName] = [];
    }
    this.state.groups[targetGroupName].push(tab);
    
    // Remove empty groups
    if (sourceGroup.length === 0) {
      delete this.state.groups[sourceGroupName];
    }
    
    // Update storage
    await StorageUtil.saveTabGroups(this.state.groups);
    
    // Re-render groups
    this.renderGroups();
  },
  
  /**
   * Show loading indicator
   */
  showLoading: function() {
    this.elements.loading.classList.remove('hidden');
    this.elements.errorMessage.classList.add('hidden');
  },
  
  /**
   * Hide loading indicator
   */
  hideLoading: function() {
    this.elements.loading.classList.add('hidden');
  },
  
  /**
   * Show error message
   */
  showError: function() {
    this.elements.loading.classList.add('hidden');
    this.elements.errorMessage.classList.remove('hidden');
  }
};

// Export the manager
window.GroupManager = GroupManager;

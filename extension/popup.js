// Tab Group AI - Popup Script
// Handles the popup UI, user interactions, and communication with the background script.

// --- UI Elements ---
const UIElements = {
  loading: document.getElementById('loading'),
  errorMessage: document.getElementById('error-message'),
  tabGroupsContainer: document.getElementById('tab-groups'),
  settingsPanel: document.getElementById('settings-panel'),
  themeToggle: document.getElementById('theme-toggle'),
  persistenceToggle: document.getElementById('persistence-toggle'),
  refreshBtn: document.getElementById('refresh-btn'),
  settingsBtn: document.getElementById('settings-btn'),
};

// --- UI Manager ---
const UIManager = {
  setLoading(isLoading) {
    UIElements.loading.classList.toggle('hidden', !isLoading);
  },

  showError(message) {
    UIElements.errorMessage.textContent = message;
    UIElements.errorMessage.classList.remove('hidden');
    setTimeout(() => UIElements.errorMessage.classList.add('hidden'), 5000);
  },

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  },

  updateSettings(settings) {
    this.applyTheme(settings.theme);
    UIElements.themeToggle.checked = settings.theme === 'dark';
    UIElements.persistenceToggle.checked = settings.persistGroups;
  },

  renderTabGroups(groups) {
    UIElements.tabGroupsContainer.innerHTML = ''; // Clear existing groups
    if (Object.keys(groups).length === 0) {
      UIElements.tabGroupsContainer.innerHTML = '<p class="empty-message">No tab groups found. Click refresh to categorize your tabs.</p>';
      return;
    }

    for (const [groupName, tabs] of Object.entries(groups)) {
      const groupElement = this.createGroupElement(groupName, tabs);
      UIElements.tabGroupsContainer.appendChild(groupElement);
    }
  },

  createGroupElement(groupName, tabs) {
    const group = document.createElement('div');
    group.className = 'tab-group';
    group.innerHTML = `
      <h2 class="group-header">${groupName}</h2>
      <div class="tabs-container">
        ${tabs.map(tab => this.createTabElement(tab)).join('')}
      </div>
    `;
    return group;
  },

  createTabElement(tab) {
    return `
      <div class="tab-item" data-tab-id="${tab.id}">
        <img src="${tab.favIconUrl || 'icons/default-icon.png'}" alt="Favicon" class="favicon">
        <span class="tab-title">${tab.title}</span>
      </div>
    `;
  },
};

// --- Storage & Communication ---
const AppService = {
  async sendMessage(action, payload) {
    return chrome.runtime.sendMessage({ action, ...payload });
  },
  async getSettings() {
    return (await chrome.storage.sync.get('settings')).settings || { theme: 'light', persistGroups: true };
  },
  async saveSettings(settings) {
    return chrome.storage.sync.set({ settings });
  },
};

// --- Event Handlers ---
const EventHandlers = {
  async onRefresh() {
    UIManager.setLoading(true);
    const response = await AppService.sendMessage('categorizeTabs');
    UIManager.setLoading(false);

    if (response.success) {
      UIManager.renderTabGroups(response.groups);
    } else {
      UIManager.showError(response.error || 'Failed to categorize tabs.');
    }
  },

  onToggleSettings() {
    UIElements.settingsPanel.classList.toggle('hidden');
  },

  async onThemeChange(event) {
    const theme = event.target.checked ? 'dark' : 'light';
    UIManager.applyTheme(theme);
    const settings = await AppService.getSettings();
    settings.theme = theme;
    await AppService.saveSettings(settings);
  },

  async onPersistenceChange(event) {
    const persistGroups = event.target.checked;
    const settings = await AppService.getSettings();
    settings.persistGroups = persistGroups;
    await AppService.saveSettings(settings);
  },
};

// --- Initialization ---
async function initialize() {
  UIManager.setLoading(true);

  // Set up event listeners
  UIElements.refreshBtn.addEventListener('click', EventHandlers.onRefresh);
  UIElements.settingsBtn.addEventListener('click', EventHandlers.onToggleSettings);
  UIElements.themeToggle.addEventListener('change', EventHandlers.onThemeChange);
  UIElements.persistenceToggle.addEventListener('change', EventHandlers.onPersistenceChange);

  // Load initial data and settings
  try {
    const [settings, response] = await Promise.all([
      AppService.getSettings(),
      AppService.sendMessage('getTabGroups'),
    ]);

    UIManager.updateSettings(settings);

    if (response.success) {
      UIManager.renderTabGroups(response.groups);
    } else {
      UIManager.showError(response.error || 'Failed to load tab groups.');
    }
  } catch (error) {
    UIManager.showError(error.message);
  } finally {
    UIManager.setLoading(false);
  }
}

document.addEventListener('DOMContentLoaded', initialize);

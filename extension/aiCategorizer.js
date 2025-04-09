// Tab Group AI - AI Categorizer
// Handles communication with the backend for AI categorization

const AICategorizer = {
  // Configuration
  config: {
    apiBaseUrl: 'http://localhost:3000', // Change to your deployed backend URL in production
    categorizationEndpoint: '/api/categorize',
    maxRetries: 3,
    retryDelay: 1000
  },
  
  /**
   * Categorize tabs using the AI backend
   * @param {Array} tabs - Array of tab objects to categorize
   * @returns {Promise<Object>} Promise that resolves with categorization result
   */
  categorizeTabs: async function(tabs) {
    let retries = 0;
    
    while (retries < this.config.maxRetries) {
      try {
        // Prepare tab data for categorization
        const tabData = tabs.map(tab => ({
          id: tab.id,
          title: tab.title,
          url: tab.url,
          favIconUrl: tab.favIconUrl || ''
        }));
        
        // Send data to backend
        const response = await fetch(`${this.config.apiBaseUrl}${this.config.categorizationEndpoint}`, {
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
        return result;
      } catch (error) {
        console.error(`Categorization attempt ${retries + 1} failed:`, error);
        retries++;
        
        if (retries >= this.config.maxRetries) {
          throw new Error(`Failed to categorize tabs after ${this.config.maxRetries} attempts: ${error.message}`);
        }
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, this.config.retryDelay));
      }
    }
  },
  
  /**
   * Categorize tabs with content extraction for better results
   * @param {Array} tabs - Array of tab objects to categorize
   * @returns {Promise<Object>} Promise that resolves with categorization result
   */
  categorizeTabsWithContent: async function(tabs) {
    try {
      // Extract content from active tab for better categorization
      const activeTab = tabs.find(tab => tab.active);
      let contentData = null;
      
      if (activeTab) {
        try {
          contentData = await TabUtil.extractTabContent(activeTab.id);
        } catch (error) {
          console.warn('Could not extract content from active tab:', error);
        }
      }
      
      // Prepare tab data for categorization
      const tabData = tabs.map(tab => {
        const data = {
          id: tab.id,
          title: tab.title,
          url: tab.url,
          favIconUrl: tab.favIconUrl || ''
        };
        
        // Add content data for active tab
        if (contentData && tab.id === activeTab.id) {
          data.content = contentData.content;
        }
        
        return data;
      });
      
      // Send data to backend
      const response = await fetch(`${this.config.apiBaseUrl}${this.config.categorizationEndpoint}`, {
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
      return result;
    } catch (error) {
      console.error('Error in categorizeTabsWithContent:', error);
      // Fall back to basic categorization
      return this.categorizeTabs(tabs);
    }
  },
  
  /**
   * Get predefined categories for the AI model
   * @returns {Array} Array of category names
   */
  getPredefinedCategories: function() {
    return [
      'Work',
      'Shopping',
      'Social Media',
      'Entertainment',
      'News',
      'Research',
      'Development',
      'Education',
      'Finance',
      'Travel',
      'Health',
      'Technology',
      'Sports',
      'Food',
      'Music',
      'Art',
      'Science',
      'Gaming',
      'Productivity',
      'Other'
    ];
  },
  
  /**
   * Perform local categorization as fallback when backend is unavailable
   * This is a simple keyword-based approach, not as good as AI
   * @param {Array} tabs - Array of tab objects to categorize
   * @returns {Object} Categorization result
   */
  localFallbackCategorization: function(tabs) {
    const categories = {
      'Work': [],
      'Shopping': [],
      'Social Media': [],
      'Entertainment': [],
      'News': [],
      'Development': [],
      'Other': []
    };
    
    const categoryKeywords = {
      'Work': ['docs', 'sheets', 'office', 'work', 'project', 'meeting', 'calendar', 'email', 'mail'],
      'Shopping': ['amazon', 'ebay', 'shop', 'store', 'buy', 'cart', 'checkout', 'product', 'price'],
      'Social Media': ['facebook', 'twitter', 'instagram', 'linkedin', 'social', 'profile', 'friend', 'post', 'share'],
      'Entertainment': ['youtube', 'netflix', 'hulu', 'movie', 'video', 'stream', 'watch', 'play', 'music', 'spotify'],
      'News': ['news', 'article', 'report', 'headline', 'media', 'politics', 'world', 'breaking'],
      'Development': ['github', 'stackoverflow', 'code', 'dev', 'api', 'programming', 'developer', 'docs']
    };
    
    // Categorize each tab
    tabs.forEach(tab => {
      const title = tab.title.toLowerCase();
      const url = tab.url.toLowerCase();
      let assigned = false;
      
      // Check each category
      for (const [category, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some(keyword => title.includes(keyword) || url.includes(keyword))) {
          categories[category].push(tab);
          assigned = true;
          break;
        }
      }
      
      // If not assigned to any category, put in Other
      if (!assigned) {
        categories['Other'].push(tab);
      }
    });
    
    // Remove empty categories
    for (const category in categories) {
      if (categories[category].length === 0) {
        delete categories[category];
      }
    }
    
    return { groups: categories };
  }
};

// Export the categorizer
window.AICategorizer = AICategorizer;

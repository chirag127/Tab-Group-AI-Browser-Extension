// Tab Group AI - Extension Test Script
// Tests the extension functionality in the browser console

// Sample tab data for testing
const sampleTabs = [
  {
    id: 1,
    title: "GitHub: Let's build from here · GitHub",
    url: "https://github.com/",
    favIconUrl: "https://github.githubassets.com/favicons/favicon.svg"
  },
  {
    id: 2,
    title: "Stack Overflow - Where Developers Learn, Share, & Build Careers",
    url: "https://stackoverflow.com/",
    favIconUrl: "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico"
  },
  {
    id: 3,
    title: "YouTube",
    url: "https://www.youtube.com/",
    favIconUrl: "https://www.youtube.com/s/desktop/12d6b690/img/favicon.ico"
  },
  {
    id: 4,
    title: "Amazon.com: Online Shopping for Electronics, Apparel, Computers, Books, DVDs & more",
    url: "https://www.amazon.com/",
    favIconUrl: "https://www.amazon.com/favicon.ico"
  },
  {
    id: 5,
    title: "Gmail",
    url: "https://mail.google.com/mail/u/0/#inbox",
    favIconUrl: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico"
  }
];

// Sample categorization result
const sampleCategories = {
  "Development": [
    {
      id: 1,
      title: "GitHub: Let's build from here · GitHub",
      url: "https://github.com/",
      favIconUrl: "https://github.githubassets.com/favicons/favicon.svg"
    },
    {
      id: 2,
      title: "Stack Overflow - Where Developers Learn, Share, & Build Careers",
      url: "https://stackoverflow.com/",
      favIconUrl: "https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico"
    }
  ],
  "Entertainment": [
    {
      id: 3,
      title: "YouTube",
      url: "https://www.youtube.com/",
      favIconUrl: "https://www.youtube.com/s/desktop/12d6b690/img/favicon.ico"
    }
  ],
  "Shopping": [
    {
      id: 4,
      title: "Amazon.com: Online Shopping for Electronics, Apparel, Computers, Books, DVDs & more",
      url: "https://www.amazon.com/",
      favIconUrl: "https://www.amazon.com/favicon.ico"
    }
  ],
  "Work": [
    {
      id: 5,
      title: "Gmail",
      url: "https://mail.google.com/mail/u/0/#inbox",
      favIconUrl: "https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico"
    }
  ]
};

// Test functions
const ExtensionTest = {
  // Test storage functionality
  testStorage: async function() {
    console.log('Testing storage functionality...');
    
    try {
      // Test saving settings
      await StorageUtil.saveSettings({
        theme: 'dark',
        persistGroups: true,
        lastCategorization: new Date().toISOString()
      });
      console.log('✅ Settings saved successfully');
      
      // Test getting settings
      const settings = await StorageUtil.getSettings();
      console.log('Retrieved settings:', settings);
      console.log('✅ Settings retrieved successfully');
      
      // Test saving tab groups
      await StorageUtil.saveTabGroups(sampleCategories);
      console.log('✅ Tab groups saved successfully');
      
      // Test getting tab groups
      const { groups } = await StorageUtil.getTabGroups();
      console.log('Retrieved tab groups:', groups);
      console.log('✅ Tab groups retrieved successfully');
      
      return true;
    } catch (error) {
      console.error('❌ Storage test failed:', error);
      return false;
    }
  },
  
  // Test tab utility functionality
  testTabUtils: async function() {
    console.log('Testing tab utility functionality...');
    
    try {
      // Test getting all tabs
      const tabs = await TabUtil.getAllTabs();
      console.log(`Found ${tabs.length} tabs:`, tabs);
      console.log('✅ getAllTabs successful');
      
      // Test getting tab metadata
      const metadata = await TabUtil.getTabsMetadata();
      console.log('Tab metadata:', metadata);
      console.log('✅ getTabsMetadata successful');
      
      return true;
    } catch (error) {
      console.error('❌ Tab utility test failed:', error);
      return false;
    }
  },
  
  // Test group manager functionality with mock data
  testGroupManager: function() {
    console.log('Testing group manager functionality with mock data...');
    
    try {
      // Mock DOM elements
      GroupManager.elements = {
        tabGroups: document.createElement('div'),
        loading: document.createElement('div'),
        errorMessage: document.createElement('div'),
        tabGroupTemplate: document.createElement('template'),
        tabItemTemplate: document.createElement('template')
      };
      
      // Set up templates
      GroupManager.elements.tabGroupTemplate.innerHTML = `
        <div class="tab-group">
          <div class="group-header">
            <div class="group-title-container">
              <span class="group-icon"></span>
              <h2 class="group-title" contenteditable="true"></h2>
            </div>
            <div class="group-actions">
              <button class="toggle-group"></button>
            </div>
          </div>
          <div class="tabs-container"></div>
        </div>
      `;
      
      GroupManager.elements.tabItemTemplate.innerHTML = `
        <div class="tab-item" draggable="true">
          <img class="tab-favicon" src="" alt="">
          <span class="tab-title"></span>
          <button class="close-tab"></button>
        </div>
      `;
      
      // Test creating group elements
      const groupElement = GroupManager.createGroupElement('Development', sampleCategories['Development']);
      console.log('Group element created:', groupElement);
      console.log('✅ createGroupElement successful');
      
      // Test creating tab elements
      const tabElement = GroupManager.createTabElement(sampleTabs[0]);
      console.log('Tab element created:', tabElement);
      console.log('✅ createTabElement successful');
      
      // Test getting group icons
      const icon = GroupManager.getGroupIcon('Development');
      console.log('Group icon for Development:', icon);
      console.log('✅ getGroupIcon successful');
      
      return true;
    } catch (error) {
      console.error('❌ Group manager test failed:', error);
      return false;
    }
  },
  
  // Test AI categorizer with mock data
  testAICategorizer: function() {
    console.log('Testing AI categorizer with mock data...');
    
    try {
      // Test local fallback categorization
      const result = AICategorizer.localFallbackCategorization(sampleTabs);
      console.log('Local fallback categorization result:', result);
      console.log('✅ localFallbackCategorization successful');
      
      // Test predefined categories
      const categories = AICategorizer.getPredefinedCategories();
      console.log('Predefined categories:', categories);
      console.log('✅ getPredefinedCategories successful');
      
      return true;
    } catch (error) {
      console.error('❌ AI categorizer test failed:', error);
      return false;
    }
  },
  
  // Run all tests
  runAllTests: async function() {
    console.log('🧪 Running all extension tests...');
    
    const storageResult = await this.testStorage();
    const tabUtilsResult = await this.testTabUtils();
    const groupManagerResult = this.testGroupManager();
    const aiCategorizerResult = this.testAICategorizer();
    
    console.log('\n📊 Test Results:');
    console.log(`Storage Tests: ${storageResult ? '✅ PASSED' : '❌ FAILED'}`);
    console.log(`Tab Utils Tests: ${tabUtilsResult ? '✅ PASSED' : '❌ FAILED'}`);
    console.log(`Group Manager Tests: ${groupManagerResult ? '✅ PASSED' : '❌ FAILED'}`);
    console.log(`AI Categorizer Tests: ${aiCategorizerResult ? '✅ PASSED' : '❌ FAILED'}`);
    
    const allPassed = storageResult && tabUtilsResult && groupManagerResult && aiCategorizerResult;
    console.log(`\n🏁 Overall Result: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
    
    return allPassed;
  }
};

// To run tests, open the extension popup and execute in console:
// ExtensionTest.runAllTests();

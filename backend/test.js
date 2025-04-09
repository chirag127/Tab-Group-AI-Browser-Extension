// Tab Group AI - Backend Test Script
// Tests the Gemini API integration

require('dotenv').config();
const geminiService = require('./services/gemini');
const logger = require('./utils/logger');

// Sample tabs data
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

// Test the categorization
async function testCategorization() {
  try {
    logger.info('Starting categorization test...');
    
    // Check if API key is set
    if (!process.env.GEMINI_API_KEY) {
      logger.error('GEMINI_API_KEY is not set in .env file');
      return;
    }
    
    logger.info(`Testing with ${sampleTabs.length} sample tabs`);
    
    // Call the categorization service
    const result = await geminiService.categorizeTabs(sampleTabs);
    
    logger.info('Categorization result:');
    console.log(JSON.stringify(result, null, 2));
    
    logger.info('Test completed successfully');
  } catch (error) {
    logger.error(`Test failed: ${error.message}`);
    console.error(error);
  }
}

// Run the test
testCategorization();

// Tab Group AI - Backend Test Runner
// Runs tests for the backend server

require('dotenv').config();
const http = require('http');
const logger = require('./utils/logger');
const geminiService = require('./services/gemini');

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

// Test functions
const BackendTest = {
  // Test Gemini service
  testGeminiService: async function() {
    logger.info('Testing Gemini service...');
    
    try {
      // Check if API key is set
      if (!process.env.GEMINI_API_KEY) {
        logger.error('GEMINI_API_KEY is not set in .env file');
        return false;
      }
      
      // Call the categorization service
      const result = await geminiService.categorizeTabs(sampleTabs);
      
      logger.info('Categorization result:');
      console.log(JSON.stringify(result, null, 2));
      
      // Check if result is valid
      if (!result || typeof result !== 'object' || Object.keys(result).length === 0) {
        logger.error('Invalid categorization result');
        return false;
      }
      
      logger.info('Gemini service test passed');
      return true;
    } catch (error) {
      logger.error(`Gemini service test failed: ${error.message}`);
      return false;
    }
  },
  
  // Test server health
  testServerHealth: async function() {
    logger.info('Testing server health...');
    
    return new Promise((resolve) => {
      // Make request to health endpoint
      const req = http.request({
        hostname: 'localhost',
        port: process.env.PORT || 3000,
        path: '/health',
        method: 'GET'
      }, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const response = JSON.parse(data);
            
            if (res.statusCode === 200 && response.status === 'ok') {
              logger.info('Server health test passed');
              resolve(true);
            } else {
              logger.error(`Server health test failed: ${JSON.stringify(response)}`);
              resolve(false);
            }
          } catch (error) {
            logger.error(`Error parsing health response: ${error.message}`);
            resolve(false);
          }
        });
      });
      
      req.on('error', (error) => {
        logger.error(`Server health test failed: ${error.message}`);
        resolve(false);
      });
      
      req.end();
    });
  },
  
  // Test categorization endpoint
  testCategorizationEndpoint: async function() {
    logger.info('Testing categorization endpoint...');
    
    return new Promise((resolve) => {
      // Make request to categorization endpoint
      const req = http.request({
        hostname: 'localhost',
        port: process.env.PORT || 3000,
        path: '/api/categorize',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
          data += chunk;
        });
        
        res.on('end', () => {
          try {
            const response = JSON.parse(data);
            
            if (res.statusCode === 200 && response.groups) {
              logger.info('Categorization endpoint test passed');
              resolve(true);
            } else {
              logger.error(`Categorization endpoint test failed: ${JSON.stringify(response)}`);
              resolve(false);
            }
          } catch (error) {
            logger.error(`Error parsing categorization response: ${error.message}`);
            resolve(false);
          }
        });
      });
      
      req.on('error', (error) => {
        logger.error(`Categorization endpoint test failed: ${error.message}`);
        resolve(false);
      });
      
      // Send sample tabs data
      req.write(JSON.stringify({ tabs: sampleTabs }));
      req.end();
    });
  },
  
  // Run all tests
  runAllTests: async function() {
    logger.info('Running all backend tests...');
    
    const geminiResult = await this.testGeminiService();
    const healthResult = await this.testServerHealth();
    const categorizationResult = await this.testCategorizationEndpoint();
    
    logger.info('\nTest Results:');
    logger.info(`Gemini Service: ${geminiResult ? 'PASSED' : 'FAILED'}`);
    logger.info(`Server Health: ${healthResult ? 'PASSED' : 'FAILED'}`);
    logger.info(`Categorization Endpoint: ${categorizationResult ? 'PASSED' : 'FAILED'}`);
    
    const allPassed = geminiResult && healthResult && categorizationResult;
    logger.info(`\nOverall Result: ${allPassed ? 'ALL TESTS PASSED' : 'SOME TESTS FAILED'}`);
    
    return allPassed;
  }
};

// Run tests if this script is executed directly
if (require.main === module) {
  BackendTest.runAllTests()
    .then((result) => {
      process.exit(result ? 0 : 1);
    })
    .catch((error) => {
      logger.error(`Error running tests: ${error.message}`);
      process.exit(1);
    });
}

module.exports = BackendTest;

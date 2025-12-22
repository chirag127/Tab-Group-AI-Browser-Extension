// Tab Group AI - Backend Test Script
// Tests the AI service integration

require('dotenv').config();
const aiService = require('./services/ai'); // Updated import

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

describe('AI Service', () => {
  // Test the categorization functionality
  it('should categorize tabs into groups', async () => {
    // Check if API key is set
    if (!process.env.CEREBRAS_API_KEY) {
      throw new Error('CEREBRAS_API_KEY is not set in .env file');
    }

    // Call the categorization service
    const result = await aiService.categorizeTabs(sampleTabs);

    // Assert that the result is an object
    expect(typeof result).toBe('object');

    // Assert that the result has at least one group
    expect(Object.keys(result).length).toBeGreaterThan(0);
  });
});

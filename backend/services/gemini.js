// Tab Group AI - Gemini Service
// Handles interaction with Gemini AI for tab categorization

const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const logger = require('../utils/logger');

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Configure the model
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-lite",
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
});

// Generation configuration
const generationConfig = {
  temperature: 0.2, // Lower temperature for more deterministic results
  topP: 0.8,
  topK: 40,
  maxOutputTokens: 1024,
};

/**
 * Categorize tabs using Gemini AI
 * @param {Array} tabs - Array of tab objects to categorize
 * @returns {Object} Object with tab groups
 */
async function categorizeTabs(tabs) {
  try {
    // Prepare prompt for Gemini
    const prompt = createCategorizationPrompt(tabs);
    
    // Call Gemini API
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig,
    });
    
    const response = result.response;
    const responseText = response.text();
    
    // Parse the response
    return parseGeminiResponse(responseText, tabs);
  } catch (error) {
    logger.error(`Error calling Gemini API: ${error.message}`);
    // Fallback to local categorization
    return fallbackCategorization(tabs);
  }
}

/**
 * Create a prompt for Gemini to categorize tabs
 * @param {Array} tabs - Array of tab objects
 * @returns {string} Prompt for Gemini
 */
function createCategorizationPrompt(tabs) {
  // Prepare tab data for the prompt
  const tabData = tabs.map((tab, index) => {
    return `Tab ${index + 1}:
Title: ${tab.title}
URL: ${tab.url}
${tab.content ? `Content: ${tab.content.substring(0, 200)}...` : ''}`;
  }).join('\n\n');
  
  // Create the prompt
  return `You are an AI assistant that categorizes browser tabs into meaningful groups.
Please analyze the following tabs and group them into categories like Work, Shopping, Social Media, Entertainment, News, Research, Development, Education, Finance, Travel, Health, Technology, Sports, Food, Music, Art, Science, Gaming, Productivity, or other appropriate categories.

Here are the tabs:

${tabData}

Please respond with a JSON object where the keys are category names and the values are arrays of tab indices (0-based).
For example:
{
  "Work": [0, 3, 5],
  "Entertainment": [1, 4],
  "Shopping": [2]
}

Only respond with the JSON object, no additional text.`;
}

/**
 * Parse Gemini response into tab groups
 * @param {string} responseText - Response text from Gemini
 * @param {Array} tabs - Original array of tab objects
 * @returns {Object} Object with tab groups
 */
function parseGeminiResponse(responseText, tabs) {
  try {
    // Extract JSON from response
    let jsonStr = responseText.trim();
    
    // If response has markdown code block, extract it
    if (jsonStr.includes('```json')) {
      jsonStr = jsonStr.split('```json')[1].split('```')[0].trim();
    } else if (jsonStr.includes('```')) {
      jsonStr = jsonStr.split('```')[1].split('```')[0].trim();
    }
    
    // Parse JSON
    const categorization = JSON.parse(jsonStr);
    
    // Convert indices to tab objects
    const groups = {};
    for (const [category, indices] of Object.entries(categorization)) {
      groups[category] = indices.map(index => tabs[index]);
    }
    
    return groups;
  } catch (error) {
    logger.error(`Error parsing Gemini response: ${error.message}`);
    logger.debug(`Response text: ${responseText}`);
    // Fallback to local categorization
    return fallbackCategorization(tabs);
  }
}

/**
 * Fallback categorization when Gemini API fails
 * @param {Array} tabs - Array of tab objects
 * @returns {Object} Object with tab groups
 */
function fallbackCategorization(tabs) {
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
  
  return categories;
}

module.exports = {
  categorizeTabs
};

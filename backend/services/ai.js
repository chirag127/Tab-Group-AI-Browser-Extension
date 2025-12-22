// Tab Group AI - AI Service
// Handles interaction with AI for tab categorization using Cerebras API

const { OpenAI } = require('openai');
const logger = require('../utils/logger');

// --- AI Client Configuration ---

const CEREBRAS_API_KEY = process.env.CEREBRAS_API_KEY;

// Cerebras client setup
const client = new OpenAI({
  baseURL: 'https://api.cerebras.ai/v1',
  apiKey: CEREBRAS_API_KEY,
});

// Model hierarchy as per AGENTS.md
const MODEL_HIERARCHY = [
  'zai-glm-4.6',
  'qwen-3-235b-a22b-instruct-2507',
  'gpt-oss-120b',
  'llama-3.3-70b',
  'qwen-3-32b',
  'llama3.1-8b',
];

// Generation configuration
const generationConfig = {
  temperature: 0.2,
  max_tokens: 32768, // Max output tokens
};

// --- Core Functions ---

/**
 * Categorizes tabs using the Cerebras AI API with a fallback cascade.
 * @param {Array<object>} tabs - Array of tab objects to categorize.
 * @returns {Promise<object>} A promise that resolves to an object with tab groups.
 */
async function categorizeTabs(tabs) {
  if (!tabs || tabs.length === 0) {
    logger.warn('categorizeTabs called with no tabs.');
    return {};
  }

  const prompt = createCategorizationPrompt(tabs);

  for (const model of MODEL_HIERARCHY) {
    try {
      logger.info(`Attempting categorization with model: ${model}`);
      const responseText = await executeApiCall(prompt, model);
      if (responseText) {
        return parseApiResponse(responseText, tabs);
      }
    } catch (error) {
      logger.error(`Error with model ${model}: ${error.message}. Trying next model.`);
    }
  }

  logger.error('All AI models failed. Falling back to local categorization.');
  return fallbackCategorization(tabs);
}

/**
 * Executes the API call to Cerebras with exponential backoff.
 * @param {string} prompt - The prompt to send to the AI.
 * @param {string} model - The model to use for the API call.
 * @returns {Promise<string|null>} The response text from the AI, or null if it fails.
 */
async function executeApiCall(prompt, model) {
  let attempts = 0;
  const maxAttempts = 3;
  let delay = 2000; // Initial delay of 2 seconds

  while (attempts < maxAttempts) {
    try {
      const completion = await client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: model,
        ...generationConfig,
      });

      return completion.choices[0].message.content;
    } catch (error) {
      attempts++;
      if (error.status === 429 || error.status >= 500) {
        logger.warn(`Rate limit or server error with ${model}. Attempt ${attempts}/${maxAttempts}. Retrying in ${delay}ms.`);
        await new Promise(res => setTimeout(res, delay));
        delay *= 2; // Exponential backoff
      } else {
        throw error; // Rethrow other errors immediately
      }
    }
  }
  return null;
}

// --- Helper Functions ---

/**
 * Creates a prompt for the AI to categorize tabs.
 * @param {Array<object>} tabs - Array of tab objects.
 * @returns {string} The prompt for the AI.
 */
function createCategorizationPrompt(tabs) {
  const tabData = tabs.map((tab, index) =>
    `Tab ${index}:
Title: ${tab.title}
URL: ${tab.url}`
  ).join('\n\n');

  return `You are an AI assistant that categorizes browser tabs into meaningful groups.
Analyze the following tabs and group them into relevant categories (e.g., "Work", "Shopping", "Social Media", "Entertainment", "News", "Research").

Tabs:
${tabData}

Respond with a JSON object where keys are category names and values are arrays of tab indices (0-based).
Example:
{
  "Work": [0, 3, 5],
  "Entertainment": [1, 4],
  "Shopping": [2]
}

Only respond with the JSON object. Do not include any other text or markdown code blocks.`;
}

/**
 * Parses the AI's JSON response into tab groups.
 * @param {string} responseText - The response text from the AI.
 * @param {Array<object>} tabs - The original array of tab objects.
 * @returns {object} An object with tab groups.
 */
function parseApiResponse(responseText, tabs) {
  try {
    const categorization = JSON.parse(responseText.trim());
    const groups = {};

    for (const [category, indices] of Object.entries(categorization)) {
      if (Array.isArray(indices)) {
        groups[category] = indices
          .map(index => tabs[index])
          .filter(Boolean); // Filter out any invalid indices
      }
    }
    return groups;
  } catch (error) {
    logger.error(`Error parsing AI response: ${error.message}`);
    logger.debug(`Response text: ${responseText}`);
    return fallbackCategorization(tabs);
  }
}

/**
 * Fallback categorization logic for when the AI API fails.
 * @param {Array<object>} tabs - Array of tab objects.
 * @returns {object} An object with tab groups.
 */
function fallbackCategorization(tabs) {
  const categories = {
    'Work': [], 'Shopping': [], 'Social Media': [], 'Entertainment': [],
    'News': [], 'Development': [], 'Other': []
  };
  const categoryKeywords = {
    'Work': ['docs', 'sheets', 'office', 'work', 'project', 'meeting', 'calendar', 'email', 'mail'],
    'Shopping': ['amazon', 'ebay', 'shop', 'store', 'buy', 'cart', 'checkout', 'product', 'price'],
    'Social Media': ['facebook', 'twitter', 'instagram', 'linkedin', 'social', 'profile', 'friend', 'post', 'share'],
    'Entertainment': ['youtube', 'netflix', 'hulu', 'movie', 'video', 'stream', 'watch', 'play', 'music', 'spotify'],
    'News': ['news', 'article', 'report', 'headline', 'media', 'politics', 'world', 'breaking'],
    'Development': ['github', 'stackoverflow', 'code', 'dev', 'api', 'programming', 'developer', 'docs']
  };

  tabs.forEach(tab => {
    const title = (tab.title || '').toLowerCase();
    const url = (tab.url || '').toLowerCase();
    let assigned = false;

    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => title.includes(keyword) || url.includes(keyword))) {
        categories[category].push(tab);
        assigned = true;
        break;
      }
    }
    if (!assigned) {
      categories['Other'].push(tab);
    }
  });

  // Clean up empty categories
  return Object.fromEntries(
    Object.entries(categories).filter(([, tabArray]) => tabArray.length > 0)
  );
}

module.exports = {
  categorizeTabs,
};

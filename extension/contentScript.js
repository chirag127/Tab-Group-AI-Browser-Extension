// Tab Group AI - Content Script
// This script runs in the context of web pages to extract content for enhanced categorization.

/**
 * Extracts a text from a given CSS selector.
 * @param {string} selector - The CSS selector to query.
 * @returns {string} The trimmed text content of the element, or an empty string if not found.
 */
const getTextFromSelector = (selector) => {
  const element = document.querySelector(selector);
  return element ? element.innerText.trim() : '';
};

/**
 * Extracts content from a meta tag.
 * @param {string} name - The value of the 'name' attribute of the meta tag.
 * @returns {string} The content of the meta tag, or an empty string if not found.
 */
const getMetaContent = (name) => {
  const element = document.querySelector(`meta[name="${name}"]`);
  return element ? element.content.trim() : '';
};

/**
 * Extracts and concatenates text from multiple elements matching a selector.
 * @param {string} selector - The CSS selector for the elements.
 * @returns {string} A space-separated string of the text content.
 */
const getTextFromMultipleSelectors = (selector) => {
  return Array.from(document.querySelectorAll(selector))
    .map(el => el.innerText.trim())
    .join(' ');
};

/**
 * Attempts to find the main content of the page using a prioritized list of selectors.
 * @returns {string} The text content of the main content area.
 */
const findMainContent = () => {
  const selectors = ['main', 'article', '#content', '.content', '#main', '.main'];
  for (const selector of selectors) {
    const content = getTextFromSelector(selector);
    if (content) return content;
  }
  // Fallback to concatenating all paragraphs if no main container is found
  return getTextFromMultipleSelectors('p');
};

/**
 * Extracts relevant content from the current page.
 * @returns {{
 *   title: string,
 *   url: string,
 *   metaDescription: string,
 *   metaKeywords: string,
 *   h1: string,
 *   mainContent: string
 * }} Extracted page content.
 */
const extractPageContent = () => {
  const mainContent = findMainContent();
  const MAX_CONTENT_LENGTH = 5000;

  return {
    title: document.title.trim(),
    url: window.location.href,
    metaDescription: getMetaContent('description'),
    metaKeywords: getMetaContent('keywords'),
    h1: getTextFromSelector('h1'),
    mainContent: mainContent.substring(0, MAX_CONTENT_LENGTH),
  };
};

/**
 * Handles messages from the extension's background script.
 */
const messageListener = (message, sender, sendResponse) => {
  if (message.action === 'extractContent') {
    try {
      const content = extractPageContent();
      sendResponse({ success: true, content });
    } catch (error) {
      console.error('Error extracting content:', error);
      sendResponse({ success: false, error: error.message });
    }
    return true; // Indicates an asynchronous response.
  }
};

// --- Initialization ---
chrome.runtime.onMessage.addListener(messageListener);

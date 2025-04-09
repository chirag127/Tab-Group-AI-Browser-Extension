// Tab Group AI - Content Script
// This script runs in the context of web pages and can extract content for better categorization

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'extractContent') {
    try {
      // Extract page content for AI categorization
      const content = extractPageContent();
      sendResponse({ success: true, content });
    } catch (error) {
      console.error('Error extracting content:', error);
      sendResponse({ success: false, error: error.message });
    }
    return true; // Indicates async response
  }
});

/**
 * Extracts relevant content from the current page for categorization
 * Focuses on important elements like headings, meta tags, and main content
 * @returns {Object} Extracted page content
 */
function extractPageContent() {
  // Get meta information
  const metaDescription = document.querySelector('meta[name="description"]')?.content || '';
  const metaKeywords = document.querySelector('meta[name="keywords"]')?.content || '';
  
  // Get headings
  const h1Text = Array.from(document.querySelectorAll('h1'))
    .map(h => h.innerText.trim())
    .join(' ');
  
  const h2Text = Array.from(document.querySelectorAll('h2'))
    .map(h => h.innerText.trim())
    .join(' ');
  
  // Try to get main content
  let mainContent = '';
  
  // First try to find main content containers
  const mainElements = [
    document.querySelector('main'),
    document.querySelector('article'),
    document.querySelector('#content'),
    document.querySelector('.content'),
    document.querySelector('#main'),
    document.querySelector('.main')
  ].filter(Boolean);
  
  if (mainElements.length > 0) {
    // Use the first main element found
    mainContent = mainElements[0].innerText.trim();
  } else {
    // Fallback: get paragraphs
    const paragraphs = Array.from(document.querySelectorAll('p'))
      .map(p => p.innerText.trim())
      .join(' ');
    
    mainContent = paragraphs;
  }
  
  // Limit content length to avoid excessive data transfer
  const MAX_CONTENT_LENGTH = 5000;
  if (mainContent.length > MAX_CONTENT_LENGTH) {
    mainContent = mainContent.substring(0, MAX_CONTENT_LENGTH);
  }
  
  return {
    title: document.title,
    url: window.location.href,
    metaDescription,
    metaKeywords,
    headings: {
      h1: h1Text,
      h2: h2Text
    },
    mainContent
  };
}

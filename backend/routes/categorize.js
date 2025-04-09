// Tab Group AI - Categorization Routes
// Handles API routes for tab categorization

const express = require('express');
const router = express.Router();
const geminiService = require('../services/gemini');
const logger = require('../utils/logger');

/**
 * POST /api/categorize
 * Categorizes tabs using Gemini AI
 * 
 * Request body:
 * {
 *   tabs: [
 *     { id: 1, title: "Tab Title", url: "https://example.com", favIconUrl: "..." },
 *     ...
 *   ]
 * }
 * 
 * Response:
 * {
 *   groups: {
 *     "Category1": [{ id: 1, title: "Tab Title", ... }],
 *     ...
 *   }
 * }
 */
router.post('/categorize', async (req, res, next) => {
  try {
    const { tabs } = req.body;
    
    // Validate request
    if (!tabs || !Array.isArray(tabs) || tabs.length === 0) {
      return res.status(400).json({
        error: 'Invalid Request',
        message: 'Request must include a non-empty array of tabs'
      });
    }
    
    // Log request (without sensitive data)
    logger.info(`Categorization request received for ${tabs.length} tabs`);
    
    // Categorize tabs using Gemini
    const categorizedGroups = await geminiService.categorizeTabs(tabs);
    
    // Return categorized groups
    res.status(200).json({
      groups: categorizedGroups
    });
  } catch (error) {
    logger.error(`Error in categorize endpoint: ${error.message}`);
    next(error);
  }
});

/**
 * GET /api/categories
 * Returns predefined categories
 */
router.get('/categories', (req, res) => {
  const categories = [
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
  
  res.status(200).json({ categories });
});

module.exports = router;

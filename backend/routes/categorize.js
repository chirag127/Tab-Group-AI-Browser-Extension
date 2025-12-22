// Tab Group AI - Categorization Routes
// Handles API routes for tab categorization

const express = require('express');
const router = express.Router();
const aiService = require('../services/ai'); // Updated import
const logger = require('../utils/logger');

// --- Routes ---

/**
 * @route POST /api/categorize
 * @description Categorizes tabs using the AI service.
 * @access Public
 */
router.post('/categorize', async (req, res, next) => {
  const { tabs } = req.body;

  // Guard clause for invalid request body
  if (!Array.isArray(tabs) || tabs.length === 0) {
    logger.warn('Invalid categorization request received.');
    return res.status(400).json({
      error: 'Invalid Request',
      message: 'Request must include a non-empty array of tabs.',
    });
  }

  try {
    logger.info(`Categorization request received for ${tabs.length} tabs.`);
    const categorizedGroups = await aiService.categorizeTabs(tabs);
    res.status(200).json({ groups: categorizedGroups });
  } catch (error) {
    logger.error(`Error in /api/categorize endpoint: ${error.message}`);
    // Pass error to the centralized error handler
    next(error);
  }
});

/**
 * @route GET /api/categories
 * @description Returns a list of predefined categories.
 * @access Public
 */
router.get('/categories', (req, res) => {
  // Centralized category list for consistency
  const predefinedCategories = [
    'Work', 'Shopping', 'Social Media', 'Entertainment', 'News', 'Research',
    'Development', 'Education', 'Finance', 'Travel', 'Health', 'Technology',
    'Sports', 'Food', 'Music', 'Art', 'Science', 'Gaming', 'Productivity', 'Other'
  ];
  
  res.status(200).json({ categories: predefinedCategories });
});

module.exports = router;

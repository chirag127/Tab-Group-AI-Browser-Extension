// Tab Group AI - Extension Test Runner
// Runs tests for the extension in the browser console

// Import test script
importScripts('test.js');

// Run tests when extension is loaded in developer mode
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install' || details.reason === 'update') {
    console.log('Tab Group AI Extension installed/updated. Run tests with ExtensionTest.runAllTests()');
  }
});

// Add test command to run tests from the extension popup
chrome.commands.onCommand.addListener((command) => {
  if (command === 'run-tests') {
    ExtensionTest.runAllTests();
  }
});

// Log message to console
console.log('Tab Group AI Test Runner loaded. Run tests with ExtensionTest.runAllTests()');

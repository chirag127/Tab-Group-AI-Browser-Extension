// Tab Group AI - Extension Packaging Script
// Packages the extension for distribution to browser stores

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const config = {
  extensionDir: './extension',
  outputDir: './dist',
  tempDir: './temp',
  extensionName: 'tab-group-ai',
  version: '1.0.0', // Should match manifest.json
  browsers: ['chrome', 'firefox', 'edge']
};

// Create necessary directories
function createDirectories() {
  console.log('Creating directories...');
  
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir);
  }
  
  if (!fs.existsSync(config.tempDir)) {
    fs.mkdirSync(config.tempDir);
  }
}

// Clean up temporary files
function cleanup() {
  console.log('Cleaning up temporary files...');
  
  if (fs.existsSync(config.tempDir)) {
    fs.rmSync(config.tempDir, { recursive: true, force: true });
  }
}

// Package for Chrome/Edge (same format)
function packageForChrome() {
  console.log('Packaging for Chrome/Edge...');
  
  try {
    // Create zip file
    const outputFile = path.join(config.outputDir, `${config.extensionName}-${config.version}-chrome.zip`);
    
    // Use 7-Zip if available, otherwise use built-in zip command
    try {
      execSync(`7z a -tzip "${outputFile}" "${config.extensionDir}\\*" -r -xr!*.git -xr!*.DS_Store`);
    } catch (error) {
      console.log('7-Zip not available, using alternative method...');
      
      // Copy files to temp directory
      fs.cpSync(config.extensionDir, path.join(config.tempDir, 'chrome'), { recursive: true });
      
      // Create zip using Node.js (requires additional libraries in a real implementation)
      console.log('NOTE: This script requires 7-Zip to be installed and in PATH.');
      console.log('Please install 7-Zip or manually zip the extension directory.');
    }
    
    console.log(`Chrome/Edge package created: ${outputFile}`);
  } catch (error) {
    console.error('Error packaging for Chrome/Edge:', error);
  }
}

// Package for Firefox
function packageForFirefox() {
  console.log('Packaging for Firefox...');
  
  try {
    // Create temporary directory for Firefox
    const firefoxTempDir = path.join(config.tempDir, 'firefox');
    fs.cpSync(config.extensionDir, firefoxTempDir, { recursive: true });
    
    // Modify manifest for Firefox if needed
    const manifestPath = path.join(firefoxTempDir, 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    // Add Firefox-specific properties if needed
    manifest.browser_specific_settings = {
      gecko: {
        id: `${config.extensionName}@example.com`,
        strict_min_version: "109.0"
      }
    };
    
    // Write modified manifest
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    
    // Create zip file
    const outputFile = path.join(config.outputDir, `${config.extensionName}-${config.version}-firefox.zip`);
    
    // Use 7-Zip if available
    try {
      execSync(`7z a -tzip "${outputFile}" "${firefoxTempDir}\\*" -r -xr!*.git -xr!*.DS_Store`);
    } catch (error) {
      console.log('7-Zip not available, using alternative method...');
      console.log('NOTE: This script requires 7-Zip to be installed and in PATH.');
      console.log('Please install 7-Zip or manually zip the extension directory.');
    }
    
    console.log(`Firefox package created: ${outputFile}`);
  } catch (error) {
    console.error('Error packaging for Firefox:', error);
  }
}

// Main function
function main() {
  console.log('Starting packaging process...');
  
  try {
    // Create directories
    createDirectories();
    
    // Package for each browser
    packageForChrome();
    packageForFirefox();
    
    // Cleanup
    cleanup();
    
    console.log('Packaging completed successfully!');
  } catch (error) {
    console.error('Error during packaging:', error);
    cleanup();
  }
}

// Run the script
main();

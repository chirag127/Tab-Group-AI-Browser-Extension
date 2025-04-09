// Tab Group AI - Project Updater
// Helps update project dependencies and configurations

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configuration
const config = {
  backendDir: './backend',
  extensionDir: './extension',
  updateCommand: 'npm update'
};

// Update backend dependencies
function updateBackend() {
  console.log('Updating backend dependencies...');
  
  // Check if backend directory exists
  if (!fs.existsSync(config.backendDir)) {
    console.error(`Backend directory not found: ${config.backendDir}`);
    return;
  }
  
  // Run update command
  const [cmd, ...args] = config.updateCommand.split(' ');
  const update = spawn(cmd, args, {
    cwd: config.backendDir,
    shell: true,
    stdio: 'inherit'
  });
  
  // Handle update process events
  update.on('error', (error) => {
    console.error(`Update error: ${error.message}`);
  });
  
  update.on('close', (code) => {
    console.log(`Backend dependencies update ${code === 0 ? 'completed successfully' : 'failed'}`);
  });
  
  return update;
}

// Update extension configuration
function updateExtensionConfig() {
  console.log('Updating extension configuration...');
  
  // Check if extension directory exists
  if (!fs.existsSync(config.extensionDir)) {
    console.error(`Extension directory not found: ${config.extensionDir}`);
    return;
  }
  
  // Read backend .env file to get port
  const envPath = path.join(config.backendDir, '.env');
  let port = 3000; // Default port
  
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const portMatch = envContent.match(/PORT=(\d+)/);
    if (portMatch && portMatch[1]) {
      port = parseInt(portMatch[1]);
    }
  }
  
  // Update background.js with correct API URL
  const backgroundPath = path.join(config.extensionDir, 'background.js');
  if (fs.existsSync(backgroundPath)) {
    let backgroundContent = fs.readFileSync(backgroundPath, 'utf8');
    
    // Update API_BASE_URL
    backgroundContent = backgroundContent.replace(
      /const API_BASE_URL = '.*?';/,
      `const API_BASE_URL = 'http://localhost:${port}';`
    );
    
    fs.writeFileSync(backgroundPath, backgroundContent);
    console.log(`Updated API_BASE_URL in background.js to http://localhost:${port}`);
  } else {
    console.error(`background.js not found at ${backgroundPath}`);
  }
  
  // Update aiCategorizer.js with correct API URL
  const categorizerPath = path.join(config.extensionDir, 'aiCategorizer.js');
  if (fs.existsSync(categorizerPath)) {
    let categorizerContent = fs.readFileSync(categorizerPath, 'utf8');
    
    // Update apiBaseUrl
    categorizerContent = categorizerContent.replace(
      /apiBaseUrl: '.*?',/,
      `apiBaseUrl: 'http://localhost:${port}',`
    );
    
    fs.writeFileSync(categorizerPath, categorizerContent);
    console.log(`Updated apiBaseUrl in aiCategorizer.js to http://localhost:${port}`);
  } else {
    console.error(`aiCategorizer.js not found at ${categorizerPath}`);
  }
}

// Print help message
function printHelp() {
  console.log(`
Tab Group AI - Project Updater

Usage:
  node update.js [command]

Commands:
  backend       Update backend dependencies
  config        Update extension configuration
  all           Update both backend dependencies and extension configuration
  help          Show this help message

Examples:
  node update.js backend  # Update backend dependencies
  node update.js config   # Update extension configuration
  node update.js all      # Update everything
  `);
}

// Main function
function main() {
  // Get command from command line arguments
  const command = process.argv[2] || 'help';
  
  // Execute command
  switch (command) {
    case 'backend':
      updateBackend();
      break;
    case 'config':
      updateExtensionConfig();
      break;
    case 'all':
      updateBackend();
      updateExtensionConfig();
      break;
    case 'help':
    default:
      printHelp();
      break;
  }
}

// Run the script
main();

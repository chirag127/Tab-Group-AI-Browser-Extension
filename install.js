// Tab Group AI - Project Installer
// Helps install project dependencies

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configuration
const config = {
  backendDir: './backend',
  extensionDir: './extension',
  installCommand: 'npm install'
};

// Install backend dependencies
function installBackend() {
  console.log('Installing backend dependencies...');
  
  // Check if backend directory exists
  if (!fs.existsSync(config.backendDir)) {
    console.error(`Backend directory not found: ${config.backendDir}`);
    return;
  }
  
  // Run install command
  const [cmd, ...args] = config.installCommand.split(' ');
  const install = spawn(cmd, args, {
    cwd: config.backendDir,
    shell: true,
    stdio: 'inherit'
  });
  
  // Handle install process events
  install.on('error', (error) => {
    console.error(`Install error: ${error.message}`);
  });
  
  install.on('close', (code) => {
    console.log(`Backend dependencies installation ${code === 0 ? 'completed successfully' : 'failed'}`);
    
    // Create .env file if it doesn't exist
    const envPath = path.join(config.backendDir, '.env');
    if (!fs.existsSync(envPath)) {
      console.log('Creating .env file from .env.example...');
      
      // Copy .env.example to .env if it exists
      const envExamplePath = path.join(config.backendDir, '.env.example');
      if (fs.existsSync(envExamplePath)) {
        fs.copyFileSync(envExamplePath, envPath);
        console.log('Created .env file. Please edit it to add your Gemini API key.');
      } else {
        console.error('.env.example file not found. Please create a .env file manually.');
      }
    }
  });
  
  return install;
}

// Create logs directory for backend
function createLogsDirectory() {
  console.log('Creating logs directory...');
  
  const logsDir = path.join(config.backendDir, 'logs');
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
    console.log('Logs directory created.');
  } else {
    console.log('Logs directory already exists.');
  }
}

// Print help message
function printHelp() {
  console.log(`
Tab Group AI - Project Installer

Usage:
  node install.js [command]

Commands:
  backend       Install backend dependencies
  help          Show this help message

Examples:
  node install.js backend  # Install backend dependencies
  `);
}

// Main function
function main() {
  // Get command from command line arguments
  const command = process.argv[2] || 'help';
  
  // Execute command
  switch (command) {
    case 'backend':
      createLogsDirectory();
      installBackend();
      break;
    case 'help':
    default:
      printHelp();
      break;
  }
}

// Run the script
main();

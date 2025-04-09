// Tab Group AI - Project Runner
// Helps run the project components

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configuration
const config = {
  backendDir: './backend',
  extensionDir: './extension',
  backendCommand: 'npm start',
  testBackendCommand: 'node test.js',
  testRunnerCommand: 'node test-runner.js'
};

// Run backend server
function runBackend() {
  console.log('Starting backend server...');
  
  // Check if backend directory exists
  if (!fs.existsSync(config.backendDir)) {
    console.error(`Backend directory not found: ${config.backendDir}`);
    return;
  }
  
  // Check if .env file exists
  const envPath = path.join(config.backendDir, '.env');
  if (!fs.existsSync(envPath)) {
    console.warn(`Warning: .env file not found at ${envPath}`);
    console.warn('Creating .env file from .env.example...');
    
    // Copy .env.example to .env if it exists
    const envExamplePath = path.join(config.backendDir, '.env.example');
    if (fs.existsSync(envExamplePath)) {
      fs.copyFileSync(envExamplePath, envPath);
      console.log('Created .env file. Please edit it to add your Gemini API key.');
    } else {
      console.error('.env.example file not found. Please create a .env file manually.');
    }
  }
  
  // Run backend command
  const [cmd, ...args] = config.backendCommand.split(' ');
  const backend = spawn(cmd, args, {
    cwd: config.backendDir,
    shell: true,
    stdio: 'inherit'
  });
  
  // Handle backend process events
  backend.on('error', (error) => {
    console.error(`Backend error: ${error.message}`);
  });
  
  backend.on('close', (code) => {
    console.log(`Backend process exited with code ${code}`);
  });
  
  return backend;
}

// Test backend
function testBackend() {
  console.log('Testing backend...');
  
  // Check if backend directory exists
  if (!fs.existsSync(config.backendDir)) {
    console.error(`Backend directory not found: ${config.backendDir}`);
    return;
  }
  
  // Run test command
  const [cmd, ...args] = config.testBackendCommand.split(' ');
  const test = spawn(cmd, args, {
    cwd: config.backendDir,
    shell: true,
    stdio: 'inherit'
  });
  
  // Handle test process events
  test.on('error', (error) => {
    console.error(`Test error: ${error.message}`);
  });
  
  test.on('close', (code) => {
    console.log(`Test process exited with code ${code}`);
  });
  
  return test;
}

// Run backend test runner
function runBackendTests() {
  console.log('Running backend tests...');
  
  // Check if backend directory exists
  if (!fs.existsSync(config.backendDir)) {
    console.error(`Backend directory not found: ${config.backendDir}`);
    return;
  }
  
  // Run test runner command
  const [cmd, ...args] = config.testRunnerCommand.split(' ');
  const testRunner = spawn(cmd, args, {
    cwd: config.backendDir,
    shell: true,
    stdio: 'inherit'
  });
  
  // Handle test runner process events
  testRunner.on('error', (error) => {
    console.error(`Test runner error: ${error.message}`);
  });
  
  testRunner.on('close', (code) => {
    console.log(`Test runner process exited with code ${code}`);
  });
  
  return testRunner;
}

// Print help message
function printHelp() {
  console.log(`
Tab Group AI - Project Runner

Usage:
  node run.js [command]

Commands:
  backend       Start the backend server
  test          Run basic backend test
  test-backend  Run comprehensive backend tests
  help          Show this help message

Examples:
  node run.js backend     # Start the backend server
  node run.js test        # Run basic backend test
  node run.js test-backend # Run comprehensive backend tests
  `);
}

// Main function
function main() {
  // Get command from command line arguments
  const command = process.argv[2] || 'help';
  
  // Execute command
  switch (command) {
    case 'backend':
      runBackend();
      break;
    case 'test':
      testBackend();
      break;
    case 'test-backend':
      runBackendTests();
      break;
    case 'help':
    default:
      printHelp();
      break;
  }
}

// Run the script
main();

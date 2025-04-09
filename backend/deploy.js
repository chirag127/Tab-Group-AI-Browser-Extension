// Tab Group AI - Backend Deployment Script
// Helps prepare the backend for deployment

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const config = {
  outputDir: './deploy',
  packageName: 'tab-group-ai-backend',
  version: '1.0.0', // Should match package.json
  files: [
    'index.js',
    'package.json',
    'package-lock.json',
    '.env.example',
    'routes/**/*',
    'services/**/*',
    'utils/**/*'
  ],
  excludes: [
    'node_modules',
    'logs',
    '.env',
    '*.log',
    'test.js'
  ]
};

// Create necessary directories
function createDirectories() {
  console.log('Creating directories...');
  
  if (!fs.existsSync(config.outputDir)) {
    fs.mkdirSync(config.outputDir, { recursive: true });
  }
}

// Copy files to output directory
function copyFiles() {
  console.log('Copying files...');
  
  // Process each file/pattern in the files array
  config.files.forEach(filePattern => {
    if (filePattern.includes('*')) {
      // Handle glob patterns
      const baseDir = filePattern.split('/*')[0];
      const targetDir = path.join(config.outputDir, baseDir);
      
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }
      
      // Copy directory recursively
      fs.cpSync(baseDir, targetDir, { 
        recursive: true,
        filter: (src) => {
          // Skip excluded files/directories
          return !config.excludes.some(exclude => 
            src.includes(exclude) || 
            src.endsWith(exclude) || 
            src.includes(`/${exclude}/`)
          );
        }
      });
    } else {
      // Handle individual files
      if (fs.existsSync(filePattern)) {
        fs.copyFileSync(filePattern, path.join(config.outputDir, path.basename(filePattern)));
      }
    }
  });
}

// Create deployment package
function createPackage() {
  console.log('Creating deployment package...');
  
  try {
    // Create zip file
    const outputFile = `${config.packageName}-${config.version}.zip`;
    const outputPath = path.join(config.outputDir, '..', outputFile);
    
    // Use 7-Zip if available
    try {
      execSync(`7z a -tzip "${outputPath}" "${config.outputDir}\\*" -r -xr!*.git -xr!*.DS_Store`);
      console.log(`Deployment package created: ${outputPath}`);
    } catch (error) {
      console.log('7-Zip not available, using alternative method...');
      console.log('NOTE: This script requires 7-Zip to be installed and in PATH.');
      console.log('Please install 7-Zip or manually zip the deployment directory.');
    }
  } catch (error) {
    console.error('Error creating deployment package:', error);
  }
}

// Create deployment instructions
function createInstructions() {
  console.log('Creating deployment instructions...');
  
  const instructions = `# Tab Group AI Backend - Deployment Instructions

## Deployment to Heroku

1. Create a new Heroku app:
   \`\`\`
   heroku create tab-group-ai-backend
   \`\`\`

2. Set environment variables:
   \`\`\`
   heroku config:set GEMINI_API_KEY=your_api_key_here
   heroku config:set NODE_ENV=production
   \`\`\`

3. Deploy the application:
   \`\`\`
   git push heroku main
   \`\`\`

## Deployment to Vercel

1. Install Vercel CLI:
   \`\`\`
   npm install -g vercel
   \`\`\`

2. Login to Vercel:
   \`\`\`
   vercel login
   \`\`\`

3. Deploy the application:
   \`\`\`
   vercel
   \`\`\`

4. Set environment variables in the Vercel dashboard.

## Deployment to AWS Elastic Beanstalk

1. Install the EB CLI:
   \`\`\`
   pip install awsebcli
   \`\`\`

2. Initialize EB application:
   \`\`\`
   eb init
   \`\`\`

3. Create an environment:
   \`\`\`
   eb create tab-group-ai-backend-env
   \`\`\`

4. Set environment variables:
   \`\`\`
   eb setenv GEMINI_API_KEY=your_api_key_here NODE_ENV=production
   \`\`\`

5. Deploy the application:
   \`\`\`
   eb deploy
   \`\`\`

## Updating the Extension

After deploying the backend, update the API_BASE_URL in the extension's background.js file to point to your deployed backend URL.

\`\`\`javascript
// In extension/background.js
const API_BASE_URL = 'https://your-deployed-backend-url.com'; // Change this
\`\`\`

Then repackage and redistribute the extension.
`;
  
  fs.writeFileSync(path.join(config.outputDir, 'DEPLOYMENT.md'), instructions);
}

// Main function
function main() {
  console.log('Starting deployment preparation...');
  
  try {
    // Create directories
    createDirectories();
    
    // Copy files
    copyFiles();
    
    // Create deployment instructions
    createInstructions();
    
    // Create package
    createPackage();
    
    console.log('Deployment preparation completed successfully!');
  } catch (error) {
    console.error('Error during deployment preparation:', error);
  }
}

// Run the script
main();

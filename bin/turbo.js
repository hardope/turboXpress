#!/usr/bin/env node

const fs = require('fs-extra');
const { exec } = require('child_process');

// Check if 'index.js' already exists
if (fs.existsSync('index.js')) {
  console.log('index.js already exists! Exiting...');
  process.exit(1);
}

// Basic Express starter code
const expressStarterCode = `
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(\`Server running at http://localhost:\${port}/\`);
});
`;

// Create index.js file
fs.writeFile('index.js', expressStarterCode, (err) => {
  if (err) throw err;
  console.log('index.js has been created with basic Express code.');
  
  // Install Express.js
  console.log('Installing Express...');
  exec('npm install express', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error installing Express: ${stderr}`);
      process.exit(1);
    }
    console.log('Express has been installed successfully.');
  });
});

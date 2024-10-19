#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');
const colors = require('colors');

async function initProject(projectName, currentDir, isCurrentFolder) {
    let projectPath;

    if (isCurrentFolder) {
        // Use the current directory for files and node_modules
        projectPath = currentDir;
        console.log(colors.yellow(`Setting up project in the current directory: ${currentDir}`));
    } else {
        // Create a new directory for the project
        projectPath = path.join(currentDir, projectName);
        try {
            if (!fs.existsSync(projectPath)) {
                console.log(colors.yellow(`Creating project directory: ${projectName}`));
                await fs.mkdir(projectPath);
            } else {
                console.log(colors.red(`Directory ${projectName} already exists. Please choose a different name.`));
                return;
            }
        } catch (error) {
            console.error(colors.red('Error creating project directory:', error.message));
            return;
        }
    }

    // Create an index.js file using turxpress
    const indexContent = `
const turbo_xpress = require('turbo-xpress');
const app = turbo_xpress();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, turbo-xpress!');
});

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});
`;

    try {
        // Write index.js to the appropriate folder
        await fs.writeFile(path.join(projectPath, 'index.js'), indexContent);
        console.log(colors.green(`index.js has been created successfully in ${projectPath}!`));

        // Change to the project directory (or stay in the current directory)
        if (!isCurrentFolder) {
            process.chdir(projectPath); // Change the current working directory to the new project folder
        }
        
        console.log(colors.yellow('Initializing npm and installing turboxpress...'));

        // Initialize npm and install turbo-xpress
        await initNpm();
        await installturbo_xpress();

        // Modify package.json to add custom start scripts
        await updatePackageJson();

        console.log(colors.green('Project setup complete!'));
    } catch (error) {
        console.error(colors.red('Error setting up project:', error.message));
    }
}

function initNpm() {
    return new Promise((resolve, reject) => {
        exec('npm init -y', (error, stdout, stderr) => {
        if (error) {
            console.error(colors.red(`Error initializing npm: ${stderr}`));
            reject(error);
            return;
        }
        resolve();
        });
    });
}

// Function to install turboxpress using npm link and install nodemon
function installturbo_xpress() {
    return new Promise((resolve, reject) => {
        exec('npm install express turbo-xpress nodemon', (error, _stdout, stderr) => {
            if (error) {
                console.error(colors.red(`Error linking turbxpress or installing nodemon: ${stderr}`));
                reject(error);
                return;
            }
            resolve();
        });
    });
}

// Function to update package.json with custom scripts
async function updatePackageJson() {
    try {
        const packageJsonPath = path.join(process.cwd(), 'package.json');
        const packageJson = await fs.readJson(packageJsonPath);

        // Add custom start scripts
        packageJson.scripts = {
            ...packageJson.scripts, // Merge existing scripts if any
            "start": "node index.js",
            "start:dev": "nodemon index.js"
        };

        // Write the modified package.json back
        await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
        console.log(colors.green('Custom scripts added to package.json!'));
    } catch (error) {
        console.error(colors.red('Error updating package.json:', error.message));
    }
}

const [,, command, projectName, currentFolderFlag] = process.argv;
const currentDir = process.cwd();

// If the command is "init" and projectName is provided
if (command === 'init' && projectName) {
    const isCurrentFolder = currentFolderFlag === '.';
    
    // Pass the currentDir if using "."
    initProject(isCurrentFolder ? currentDir : projectName, currentDir, isCurrentFolder);
} else {
    console.log(colors.red('Invalid command. Use "turb-xpresss init <project-name>" or "turbo-xpress init <project-name> ."'));
}

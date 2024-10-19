# turboXpress

`turboXpress` is a Framework & CLI tool designed to help you quickly create and scaffold Express-based projects. It is built on top of ExpressJs and includes built-in logging, static file serving, and JSON request handling by default, so you can focus on building your application.

## Installation

Install `turboXpress` globally using npm:

```bash
npm install -g turbo-xpress
```
## Usage
1. Initialize a New Express Project

To create a new folder with your project name, install the required dependencies, and scaffold a basic turboXpress app:

```bash

turbo-xpress init <project-name>
```

This command will:

    Create a directory with the specified <project-name>.
    Install turbo-xpress and nodemon as dependencies.
    Automatically create all the necessary files and set up a basic turboXpress application with predefined routes, logging, static server setup, and JSON parsing.

2. Setup a Project in the Current Folder

To set up a new project in the current folder (without creating a new one), use this command:

```bash

turbo-xpress init <project-name> .
```

This will:

    Install turbo-xpress and nodemon in the current directory.
    Set up the basic structure of a turboXpress application inside the current folder.

## Using Your Generated Project

Once initialized, you can immediately start using the project as you would with a regular Express app. Since turbo-xpress is already imported, the project is ready to run:

```javascript

// app.js (auto-generated)

const app = require('turbo-xpress')();

app.get('/', (req, res) => {
    res.send('Hello, turboXpress!');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
```
Key Features

    Default Logger: Automatically logs request methods, URLs, status codes, and response times.
    Static File Serving: Serves files from the /static directory by default.
    JSON Handling: Automatically parses JSON payloads for incoming requests.

## Project Structure

After initialization, the project will have the following structure:

```

project-name/
├── node_modules/
├── package.json
├── app.js
└── static/
    └── index.html (or other static files)
```
## Features

    Fast Setup: Quickly scaffold your project with one command.
    Pre-configured: Built-in logging, static file serving, and JSON parsing.
    Flexible: Can be initialized in a new directory or the current working directory.
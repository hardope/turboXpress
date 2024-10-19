const express = require('express');

// The main function exported by turboXpress
const turbo_xpress = () => {
    const app = express();

    app.use((req, res, next) => {
        const start = Date.now();
        res.on('finish', () => {
            const duration = Date.now() - start;
            const timestamp = new Date().toISOString();
            console.log(`[${timestamp}] -- ${req.method} -- ${req.url} -- ${res.statusCode} -- ${duration}ms`);
        });
        next();
    });

    app.use(express.json());

    app.use('/static', express.static('static'));

    return app; // Return the express apjp object
}

module.exports = turbo_xpress;
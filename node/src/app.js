const config = require('./config/config')
const express = require('express')
const init = require('./loaders/settings')

async function startServer(){
    const app = express();

    /*Move to another file soon as I work out how*/
    await init(app, config);

    app.listen(config.port,() => {
        console.log(`
################################################
🛡️  Server listening on port: ${config.port} 🛡️
################################################
        `)
    }).on('error', err => {
        console.error(err);
        process.exit(1)
    });
}

startServer();
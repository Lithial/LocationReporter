const expressSettings = require('./express')

module.exports = async function initSettings(app,config) {
    console.log("Loading express settings");
    await expressSettings(app,config);
    console.log("Loaded express settings");
}
const isAuth = require("../middleware/isAuth");
const config = require('../../config/config')

module.exports = (app) => {

    app.get(`${config.api?.prefix}/`, async (req, res) => {
        console.log("Health Check");
        return res.json({ msg: "Server is healthy" }).status(200);
    });

    app.get(`${config.api?.prefix}/${config.api?.authorised}`, isAuth, async (req, res) => {
        console.log("Ping from authorized user");
        return res.json({ msg: "User is authorized" }).status(200);
    });
};
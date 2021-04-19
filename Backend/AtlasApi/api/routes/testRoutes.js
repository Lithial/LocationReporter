const isAuth = require("../middleware/isAuth");

module.exports = (app) => {

    app.get('/authorized', isAuth, (req, res) => {
        console.log("Ping from authorized user");
        return res.json({ msg: "User is authorized" }).status(200);
    });
};
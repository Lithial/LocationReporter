const isAuth = require("../middleware/isAuth");

module.exports = (app) => {
    
    app.get('/users', isAuth, (req, res) => {
        console.log("Get for Users");
        return res.json({ msg: "User is authorized" }).status(200);
    });
};
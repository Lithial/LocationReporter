const isAuth = require("../middleware/isAuth");
const userId = require("../middleware/getUserStub");
const userPG = require("../middleware/postgres/userPG")
const getConnection = require('../../loaders/connection')
const config = require('../../config/config')

module.exports = (app) => {

    app.get('/user',isAuth, (req, res) => {

        const pool = getConnection();

        let id = userId(req);
        console.log('GET |',id);

        let user = userPG.getUser(pool, id);
        return res.send(req.body).status(200);
    });

    app.post('/user', isAuth, (req, res) => {

        const pool = getConnection();

        let id = userId(req);
        console.log('POST |',id)

        let user = userPG.createUser(pool, id, req);
        return res.send(req.body).status(200);
    })
};
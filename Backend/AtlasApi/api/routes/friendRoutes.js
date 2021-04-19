const isAuth = require("../middleware/isAuth");
const userId = require("../middleware/getUserStub");
const friendPG = require("../middleware/postgres/friendPG")
const getConnection = require('../../loaders/connection')
const config = require('../../config/config')

module.exports = (app) => {

    app.get('/friend',isAuth, (req, res) => {

        const pool = getConnection();

        let id = userId(req);
        console.log('GET |',id);

        let user = friendPG.getFriend(pool, id);
        return res.send(req.body).status(200);
    });

    app.post('/friend', isAuth, (req, res) => {

        const pool = getConnection();

        let id = userId(req);
        console.log('POST |',id)

        let user = friendPG.createFriend(pool, id, req);
        return res.send(req.body).status(200);
    })

    app.put('/friend', isAuth, (req, res) => {

        const pool = getConnection();

        let id = userId(req);
        console.log('PUT |',id)

        let user = friendPG.updateFriend(pool, id, req);
        return res.send(req.body).status(200);
    })

    app.delete('/friend', isAuth, (req, res) => {

        const pool = getConnection();

        let id = userId(req);
        console.log('DELETE |',id)

        let user = friendPG.deleteFriend(pool, id);
        return res.send(req.body).status(200);
    })
};
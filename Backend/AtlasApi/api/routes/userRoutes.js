const isAuth = require("../middleware/isAuth");
const userId = require("../middleware/getUserStub");
const userPG = require("../middleware/postgres/userPG")
const getConnection = require('../../loaders/connection')
const config = require('../../config/config')

module.exports = (app) => {

    app.get(`${config.api?.prefix}/${config.api?.user}`,isAuth, async (req, res) => {

        const pool = getConnection();

        let id = userId(req);
        console.log('GET |',id);

        userPG.getUserWithLocation(pool, id, function (response) {
            return res.send(response);

        })
    });

    app.post(`${config.api?.prefix}/${config.api?.user}`, isAuth, (req, res) => {

        const pool = getConnection();

        let id = userId(req);
        console.log('POST |',id)
        let user = userPG.createUser(pool, id, req, function(user){
            if(user.nickname != null){
                return res.send(user).status(200);
            }
            else{
                return res.send({msg: "User not created", status: "404"})
            }
        });


    })

    app.put(`${config.api?.prefix}/${config.api?.user}`, isAuth, (req, res) => {

        const pool = getConnection();

        let id = userId(req);
        console.log('PUT |',id)

        let user = userPG.updateUser(pool, id, req);
        return res.send(req.body).status(200);
    })
    
    app.put(`${config.api?.prefix}/${config.api?.user}/discord`, isAuth, (req, res) => {

        const pool = getConnection();

        let id = userId(req);
        console.log('PUT |',id)

        let user = userPG.updateUser(pool, id, req);
        return res.send(req.body).status(200);
    })

    app.delete(`${config.api?.prefix}/${config.api?.user}`, isAuth, (req, res) => {

        const pool = getConnection();

        let id = userId(req);
        console.log('DELETE |',id)

        let user = userPG.deleteUser(pool, id);
        return res.send(req.body).status(200);
    })

    app.put(`${config.api?.prefix}/${config.api?.code}`, isAuth, (req, res) => {

        const pool = getConnection();

        let id = userId(req);
        console.log('PUT |',id)

        let code = userPG.updateFriendCode(pool, id);
        console.log("code:", code);
        return res.send({
            friendCode: code,
        }).status(200);
    })
};
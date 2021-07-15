const isAuth = require("../middleware/isAuth");
const userId = require("../middleware/getUserStub");
const friendPG = require("../middleware/postgres/friendPG")
const getConnection = require('../../loaders/connection')
const config = require('../../config/config')

module.exports = (app) => {

    app.get(`${config.api?.prefix}/${config.api?.friends}`, isAuth, (req, res) => {

        const pool = getConnection();

        let id = userId(req);
        console.log('GET FRIEND |', id);

        friendPG.getFriends(pool, id, function(data){
            return res.send(data);
        });
        
    });

    app.post(`${config.api?.prefix}/${config.api?.friends}`, isAuth, (req, res) => {
        const pool = getConnection();

        let id = userId(req);
        console.log('POST | FRIEND |', id)
        friendPG.getFriend(pool, req, function (data) {
            console.log("Post friend data:",data.data)
            if(!data.data){
                return res.send({
                    status: 400,
                    msg:"No friend associated with this code"
                })
            }
            else{
                console.log("id:",id)
                console.log("Fid:",data.data.userid)
                friendPG.createFriend(pool, data.data.userid, id, function (response) {
                    //TODO probably need a notification of some kind here
                    if(response.status === 400){
                        console.log("Part 1 Error: ", response.error)
                    }
                    console.log(`Friend added`);
                    /*   return res.send(response);*/
                });
                friendPG.createFriend(pool, id, data.data.userid, function (response) {
                    if(response.status === 400){
                        console.log("Part 2 Error: ", response.error)
                    }
                    console.log(`Friend added`);
                    //TODO return the friend user objects;
                    return res.send({
                        status: 200,
                        data: data.data
                    });
                });
            }
        });
    })

    app.put(`${config.api?.prefix}/${config.api?.friends}`, isAuth, (req, res) => {

        const pool = getConnection();

        let id = userId(req);
        console.log('PUT |', id)

        friendPG.updateFriend(pool, id, req);
        return res.send(req.body).status(200);
    })

    app.delete(`${config.api?.prefix}/${config.api?.friends}`, isAuth, (req, res) => {

        const pool = getConnection();

        let id = userId(req);
        console.log('DELETE |', id, '||', req.body.friendId)

        if(!req.body || !req.body.friendId){
            console.log("Problem deleting friend")
            return res.send({
                status: 400,
                msg:"Problem deleting friend. Request empty"
            })
        }
        friendPG.deleteFriend(pool,id, req, function(response){
            return res.send(response);
        });
    })
};


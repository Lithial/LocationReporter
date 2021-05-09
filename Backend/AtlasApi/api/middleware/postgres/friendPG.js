const queryLibrary = require('./queryLibrary');

getFriend = (pool,req, callback) =>{

    pool.connect((err,client,done) => {
        if(err) throw err;

        client.query(queryLibrary.getPotentialFriend(req.body.friendCode.toString()),
            (err,res) => {
                if(err) {
                    console.log("Failed to fetch friend");
                    callback({
                        status: 404,
                        msg: "Failed to fetch friend"
                    })
                }else{
                    console.log("Friend fetched successfully");
                    callback({
                        status: 200,
                        data: res.rows[0]
                    });
                }
            });
        done();
    })
}

getFriends = (pool,id, callback) =>{

    pool.connect((err,client,done) => {
        if(err) throw err;

        client.query(queryLibrary.getFriends(id.toString()),
            (err,res) => {
                if(err) {
                    console.log(err.stack);
                }else{
                    callback(res.rows);
                }
            });
        done();
    })

}

createFriend = (pool,id,friendId, callback) => {

    pool.connect((err,client,done) => {
        if (err) throw err;

        client.query(queryLibrary.createFriend(id, friendId), (err, res) => {
            if (err) {
                console.log("Query: ", queryLibrary.createFriend(id, friendId))
                callback({
                    status: 400,
                    msg: "Failed to create friend",
                    error: err.toString()
                })
            } else {
                console.log("Friend created successfully");
                callback({
                    status: 200,
                    data:res
                });
            }
        });
        done();
    })
}

updateFriend = (pool,id,req) => {

    pool.connect((err,client,done) => {
        if (err) throw err;

        client.query(queryLibrary.updateFriend(id, req), (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log("Friend updated successfully");
            }
        });

        done();
    })
}

deleteFriend = (pool,id, req, callback) => {

    pool.connect((err,client,done) => {
        if (err) throw err;

        client.query(queryLibrary.deleteFriend(id, req), (err, res) => {
            if (err) {
                console.log("Error deleting friends with id:", `${id}${req.body.friendId}`, " || ", `${req.body.friendId}${id}`)
                console.log("Error with Query:", queryLibrary.deleteFriend(id,req.body.friendId))
                callback({
                    msg:"Error deleting friend.",
                    status: "404",
                })
            } else {
                console.log("Users deleted successfully");
                callback({
                    msg:"Successfully deleted friend.",
                    status: "200",
                })
            }
        });
        done();
    })
}



module.exports = {
    getFriend: getFriend,
    getFriends: getFriends,
    createFriend: createFriend,
    updateFriend: updateFriend,
    deleteFriend: deleteFriend,
}
const queryLibrary = require('./queryLibrary');

getFriend = (pool,req, callback) =>{

    pool.connect((err,client,done) => {
        if(err) throw err;

        client.query(queryLibrary.getPotentialFriend(req.body.friendCode.toString()),
            (err,res) => {
                if(err) {
                    console.log(err.stack);
                }else{
                    console.log("Friend fetched successfully");
                    callback(res.rows[0]);
                }
                done();
            });
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
                    console.log("Friend fetched successfully");
                    console.log(res.rows);
                    callback(res.rows);
                }
                done();
            });
    })
}

createFriend = (pool,id,friendId, callback) => {

    pool.connect((err,client,done) => {
        if (err) throw err;

        client.query(queryLibrary.createFriend(id, friendId), (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log("Friend created successfully");
                callback(res);
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

deleteFriend = (pool,id) => {

    pool.connect((err,client,done) => {
        if (err) throw err;

        client.query(queryLibrary.deleteFriend(id), (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log("User deleted successfully");
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
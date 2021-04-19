const queryLibrary = require('./queryLibrary');

getFriend = (pool,id) =>{

    pool.connect((err,client,done) => {
        if(err) throw err;

        client.query(queryLibrary.getFriend(id.toString()),
            (err,res) => {
                if(err) {
                    console.log(err.stack);
                }else{
                    console.log("Friend fetched successfully");
                }
                done();
            });
    })
}
createFriend = (pool,id,req) => {

    pool.connect((err,client,done) => {
        if (err) throw err;

        client.query(queryLibrary.createFriend(id, req), (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log("Friend created successfully");
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
    createFriend: createFriend,
    updateFriend: updateFriend,
    deleteFriend: deleteFriend,
}
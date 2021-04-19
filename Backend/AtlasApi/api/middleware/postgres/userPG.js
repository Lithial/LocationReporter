const queryLibrary = require('./queryLibrary');

getUser = (pool,id) =>{

    pool.connect((err,client,done) => {
    if(err) throw err;

    client.query(queryLibrary.getUser(id.toString()),
        (err,res) => {
            if(err) {
                console.log(err.stack);
            }else{
                console.log("User fetched successfully");
            }
            done();
        });
    })
}
createUser = (pool,id,req) => {

    pool.connect((err,client,done) => {
        if (err) throw err;

        client.query(queryLibrary.createUser(id, req), (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log("User created successfully");
            }
        });

        client.query(queryLibrary.createLocation(id, req), (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log("Location created successfully");
            }
        });
        done();
    })
}
updateUser = (pool,id,req) => {

    pool.connect((err,client,done) => {
        if (err) throw err;

        client.query(queryLibrary.updateUser(id, req), (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log("User updated successfully");
            }
        });

        client.query(queryLibrary.updateLocation(id, req), (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log("Location updated successfully");
            }
        });
        done();
    })
}

deleteUser = (pool,id) => {

    pool.connect((err,client,done) => {
        if (err) throw err;

        client.query(queryLibrary.deleteLocation(id), (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log("Location deleted successfully");
            }
        });

        client.query(queryLibrary.deleteUser(id), (err, res) => {
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
    getUser: getUser,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
}
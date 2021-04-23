const queryLibrary = require('./queryLibrary');
const {
    v4: uuidv4,
} = require('uuid');

getUserWithLocation = (pool, id, callback) => {

    pool.connect((err, client, done) => {
        if (err) throw err;
        client.query(queryLibrary.getUserWithLocation(id.toString()))
            .then(response => {
                if(response.rowCount === 0){
                    callback({msg:"No user found", status:"404"})
                }
                else{
                    callback(response.rows[0]);
                }
            })
            .catch(e => console.error(e.stack));
    })
}

createUser = (pool, id, req, callback) => {
    const currentFriendCode = uuidv4();

    pool.connect((err, client, done) => {
        if (err) throw err;

        client.query(queryLibrary.createUser(id, req,currentFriendCode), (err, res) => {
            if (err) {
                console.log("Error with request:", req.body)
                console.log("Error with Query:", queryLibrary.createUser(id, req))
            } else {
                console.log("User created successfully");
            }
        });

        client.query(queryLibrary.createLocation(id, req), (err, res) => {
            if (err) {
                console.log("Error with request:", req.body)
                console.log("Error with Query:", queryLibrary.createLocation(id, req))
            } else {
                console.log("Location created successfully");
            }
        });
        done();
        callback({
            ...req.body,
            currentFriendCode
        })
    })
}

updateUser = (pool, id, req) => {

    pool.connect((err, client, done) => {
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

deleteUser = (pool, id) => {

    pool.connect((err, client, done) => {
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

updateFriendCode = (pool, id) => {
    const currentFriendCode = uuidv4();
    console.log("currentFriendCode:", currentFriendCode)
    pool.connect((err, client, done) => {
        if (err) throw err;

        client.query(queryLibrary.updateFriendCode(id, currentFriendCode), (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log("Friend Code updated successfully to ", currentFriendCode);
            }
        });

        done();
    })
    return currentFriendCode;
}


module.exports = {
    getUserWithLocation:getUserWithLocation,
    getUser: getUser,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    updateFriendCode: updateFriendCode,
}
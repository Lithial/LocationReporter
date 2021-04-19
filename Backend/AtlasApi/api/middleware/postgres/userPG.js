const queryLibrary = require('./queryLibrary');

getUser = (pool,id) =>{

    pool.connect((err,client,done) => {
    if(err) throw err;
    console.log(queryLibrary.getUser(id));
    client.query(queryLibrary.getUser(id.toString()),
        (err,res) => {
            if(err) {
                console.log(err.stack);
            }else{
                console.log("User fetched successfully");
                console.log(res);
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

module.exports = {
    getUser: getUser,
    createUser: createUser,
}
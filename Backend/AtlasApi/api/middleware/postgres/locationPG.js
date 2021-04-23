const queryLibrary = require('./queryLibrary');

updateLocation = (pool,id,req,callback) => {

    pool.connect((err,client,done) => {
        if (err) throw err;

        client.query(queryLibrary.updateLocation(id, req), (err, res) => {
            if (err) {
                console.log("Error with request:", req.body)
                console.log("Error with Query:", queryLibrary.updateLocation(id, req))

                callback({
                    msg: "Unable to update location",
                    status: "404"
                })
            } else {
                console.log("Location updated successfully");
                callback({
                    msg: "Location updated successfully",
                    status: "200"
                })
            }
        });
        done();

    })
}

updateShowLocation = (pool,id,req,callback) => {

    pool.connect((err,client,done) => {
        if (err) throw err;

        client.query(queryLibrary.updateLocation(id, req), (err, res) => {
            if (err) {
                console.log("Error with request:", req.body)
                console.log("Error with Query:", queryLibrary.updateShowLocation(id, req))

                callback({
                    msg: "Unable to update show location",
                    status: "404"
                })
            } else {
                console.log("Show Location updated successfully");
                callback({
                    msg: "Location updated successfully",
                    status: "200"
                })
            }
        });
        done();

    })
}

module.exports = {
    updateLocation:updateLocation,
    updateShowLocation:updateShowLocation,
}
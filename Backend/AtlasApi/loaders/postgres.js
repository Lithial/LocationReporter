const queryLibrary = require('../api/middleware/postgres/queryLibrary')
const userRoutes = require('../api/routes/userRoutes');
const { Pool } = require('pg');
const getConnection = require('./connection');

function createDatabase(app) {

    const pool = getConnection();

    userRoutes(app);

    pool.connect((err,client,done) => {
        if (err) throw err;
        client.query(queryLibrary.userTable, (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log("User table created successfully");
            }
        });
        client.query(queryLibrary.locationTable, (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log("Location table created successfully");
            }
        });
        client.query(queryLibrary.friendTable, (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log("Friend table created successfully");
            }
        });
        done();
    })

}
module.exports = {
    createDatabase:createDatabase
};
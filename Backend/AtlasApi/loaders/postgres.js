const queryLibrary = require('../api/middleware/postgres/queryLibrary')
const { Pool } = require('pg');

module.exports = async function createDatabase(app,config) {
    const pool = new Pool({
        user: config.pgUser,
        host: config.pgHost,
        database: config.pgDb,
        password: config.pgPass,
        port: config.pgPort
    });
    pool.on('error', (err,client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    });
    pool.connect((err,client,done) => {
        if(err) throw err;
        client.query(queryLibrary.userTable, (err,res) => {
            if(err) {
                console.log(err.stack);
            }else{
                console.log("User Table created successfully");
            }
        });
        client.query(queryLibrary.locationTable, (err,res) => {

            if(err) {
                console.log(err.stack);
            }else{
                console.log("Location Table created successfully");
            }
        });
        client.query(queryLibrary.friendTable, (err,res) => {
            done();

            if(err) {
                console.log(err.stack);
            }else{
                console.log("Friends Table created successfully");
            }
        })
    })
}

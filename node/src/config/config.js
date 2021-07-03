// const dotenv = require('dotenv');
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/*const envFound = dotenv.config();
if (envFound.error) {
    // This error should crash whole process

    throw new Error("⚠️  Couldn't find .env.old file  ⚠️");
}
*/
let env = process.env;
console.log("Logging env:", env.USER)
module.exports = Config = {
    /*
    Port for application to run on
    */
    port: parseInt(process.env.PORT, 10),

    /*
    Postgres INFO
    */
    pgUser: process.env.PGUSER,
    pgHost: process.env.PGHOST,
    pgDb: process.env.PGDATABASE,
    pgPass: process.env.PGPASSWORD,
    pgPort: process.env.PGPORT,

    /*
    Auth0 stuffs
    */
    domain: process.env.DOMAIN,
    audience: process.env.AUDIENCE,

    /*JWT props*/
    jwtSecret: process.env.JWT_SECRET,
    jwtAlgorithm: process.env.JWT_ALGO,

    /*api details*/
    api: {
        prefix: process.env.API_ROUTE,
        user: process.env.USER,
        friends: process.env.FRIENDS,
        code: process.env.CODE,
        location: process.env.LOCATION,
        authorised: process.env.AUTHORIZED,
    },

}
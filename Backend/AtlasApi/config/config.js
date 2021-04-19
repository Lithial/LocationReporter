const dotenv = require('dotenv');
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
    // This error should crash whole process

    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = Config = {
    /*
    Port for application to run on
    */
    port: parseInt(process.env.PORT, 10),

    /*
    Postgres INFO
    */
    pgUser: process.env.POSTGRESUSER,
    pgHost: process.env.POSTGRESHOST,
    pgDb: process.env.POSTGRESDATABASE,
    pgPass: process.env.POSTGRESPASSWORD,
    pgPort: process.env.POSTGRESPORT,
    pgIdleTimeout: process.env.POSTGRESIDLETIMEOUT,
    pgConnectTimeout: process.env.POSTGRESIDLETIMEOUT,

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
        prefix: '/api',
    },

}
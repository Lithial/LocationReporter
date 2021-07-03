const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const config = require('../../config/config')
const dotenv = require('dotenv');


/**
 * We are assuming that the JWT will come in a header with the form
 *
 * Authorization: Bearer ${JWT}
 *
 * But it could come in a query parameter with the name that you want like
 * GET https://my-bulletproof-api.com/stats?apiKey=${JWT}
 * Luckily this API follow _common sense_ ergo a _good design_ and don't allow that ugly stuff*/

const getTokenFromHeader = req => {
    /**
     * @TODO Edge and Internet Explorer do some weird things with the headers
     * So I believe that this should handle more 'edge' cases ;)
     */
    if (
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
        (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    ) {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
};

const isAuth = jwt({
    secret:jwksRsa.expressJwtSecret({
        cache:true,
        rateLimit:true,
        jwksRequestsPerMinute: 5,
        jwksUri:`https://${config.domain}/.well-known/jwks.json`
    }),
    audience: config.audience,
    issuer:`https://${config.domain}/`,
    algorithms:[`${config.jwtAlgorithm}`],
});

module.exports = isAuth;
const express = require('express');
const cors = require('cors');
const testRoutes = require('../api/routes/testRoutes');
const userRoutes = require('../api/routes/userRoutes');
const friendsRoutes = require('../api/routes/friendsRoutes');

module.exports = async function expressSettings ( app,config ) {
    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');

    // The magic package that prevents frontend developers going nuts
    // Alternate description:
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(express.json());
    app.use(express.urlencoded({extended: true}))
    app.use(cors({
        origin: 'http://localhost:3000'
    }));

    // Load API routes
    testRoutes(app);
    userRoutes(app);
    friendsRoutes(app);
    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });

    /// error handlers
    app.use((err, req, res, next) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === 'UnauthorizedError') {
            return res
                .status(err.status)
                .send({ message: err.message })
                .end();
        }
        return next(err);
    });
    app.use((err, req, res) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            },
        });
    });
};
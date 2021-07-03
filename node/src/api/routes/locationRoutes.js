const isAuth = require("../middleware/isAuth");
const getConnection = require('../../loaders/connection')
const userId = require("../middleware/getUserStub");
const locationPG = require("../middleware/postgres/locationPG")
const config = require('../../config/config')

module.exports = (app) => {

    app.put(`${config.api?.prefix}/${config.api?.location}`, isAuth, (req, res) => {
        
        const pool = getConnection();
        let id = userId(req);
        console.log('PUT |', id)

        locationPG.updateLocation(pool, id, req, function(data){
           return res.send(data);
        });
    })
    app.put(`${config.api?.prefix}/${config.api?.location}/show`, isAuth, (req, res) => {

        const pool = getConnection();
        let id = userId(req);
        console.log('PUT |', id)

        locationPG.updateShowLocation(pool, id, req, function(data){
            return res.send(data);
        });
    })
}
const isAuth = require("../middleware/isAuth");
const getConnection = require('../../loaders/connection')
const userId = require("../middleware/getUserStub");
const locationPG = require("../middleware/postgres/locationPG")

module.exports = (app) => {

    app.put('/location', isAuth, (req, res) => {
        
        const pool = getConnection();
        let id = userId(req);
        console.log('PUT |', id)

        let location = locationPG.updateLocation(pool, id, req, function(data){
           return res.send(data);
        });
    })
    app.put('/location/show', isAuth, (req, res) => {

        const pool = getConnection();
        let id = userId(req);
        console.log('PUT |', id)

        let location = locationPG.updateShowLocation(pool, id, req, function(data){
            return res.send(data);
        });
    })
}

var express = require('express');
var router = express.Router();
const checkToken = require("../jwt/checkToken");
const googlePlaceUtils = require('../utils/googleMapsUtils');
const restaurantsUtils = require('../utils/restaurantsUtils');

router.get('/', checkToken, async function(req, res, next) {
    const place = req.query.place
    const lat = req.query.lat
    const lon = req.query.lon
    try {
        // a function that check that the lat and lon parameters are numbers
        const validateLatLon = restaurantsUtils.checkCoordinates(lat, lon);
        
        if ((place != undefined &&  place != '' ) || (validateLatLon) ){
            
                const restaurants = await googlePlaceUtils.getRestaurants(place,lat,lon);
                res.send(restaurants)
            }
        else{
            res.status(500).send("The coordinates and the place are not defined")
        }
    }
    catch (error) {
        res.status(500).send("An error occurred while doing the search: "+error.message)
    }
    
    
});



module.exports = router;
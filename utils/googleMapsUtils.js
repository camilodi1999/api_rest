
const axios = require('axios')
const config = require('../config')

// set the api key and the url for the api in variables
const apiKey = config.googlemapskey;
const searchUrlBase = new URL(config.textsearchurl);

/**
 * function to search for a restaurant near to the place or location given
 * @param {string} place used for the restaurant search
 * @param {string} lat latitude used for the restaurant search
 * @param {string} lon longitude used for the restaurant search
 * @returns a list of restaurants near the place or location specified
 */
async function getRestaurants(place,lat,lon){
  try{
    // makes a copy of the base url
    let queryUrl = new URL(searchUrlBase.toString());
    
    // Add the query to the url's params if the place is defined 
    if (place) queryUrl.searchParams.append('query',place);
    
    // Add the location to the url's params if the latitude and longitude are valid  
    else if  (lat && lon)  queryUrl.searchParams.append('location',`${lat},${lon}`);

    // fix the type of search as restaurant and adds the api key
    queryUrl.searchParams.append('type','restaurant');
    queryUrl.searchParams.append('key',apiKey);
    // make the request to the google's places API
    const {data} = await axios.get(queryUrl.toString());
    
    return data.results
  } 
  catch (err) {
    throw new Error("Error while searching restaurants: "+ err.message)
  }
}



module.exports = {getRestaurants};
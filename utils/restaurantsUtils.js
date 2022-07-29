/**
 * checks if the coordinates are valid
 * @param {string} lat latitude
 * @param {string} lon longitued
 * @returns true if both params are numbers, false if the coordinates are
 * not defined
 * throws an error if the coordinates are not valid
 */
function checkCoordinates(lat,lon){
    let check = true;
    // check if are undefined
    if (lat &&  lon){
        // check if are numbers
        if (isNaN(Number(lat)))  {
            throw new Error("the latitude is not valid");
        }
        if (isNaN(Number(lon))) { 
            throw new Error("the longitude is not valid");
        }
    }
    else check = false

    return check
}

module.exports = {checkCoordinates};
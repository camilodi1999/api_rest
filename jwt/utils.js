const jwt = require("jsonwebtoken");
const config = require("./config");
const {User} = require("../models/user")
const crypto = require('crypto'); 


/**
 * generate the jwt token from the email user
 * @param {username} username of the user logged 
 * @returns token
 */

function generateJwt(email) {

    const token = jwt.sign({ email}, config.secret, { expiresIn: "24h" });
    return token
  
};

/**
 * function to generate the password hash
 * @param {*} password 
 * @returns password hash
 */
function generateHash(password) {
    
    
    // Hashing user's salt and password with 1000 iterations, 
    return crypto.createHash('sha256').update(password).digest("hex")
};

module.exports = {generateJwt, generateHash};

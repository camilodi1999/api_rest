const jwt = require("jsonwebtoken");
const config = require("../config");
const crypto = require('crypto'); 




/**
 * generate the jwt token from the email user and it
 * expires in 30m
 * @param {string} username of the user logged 
 * @returns token
 */

function generateJwt(email) {
    const secretKey = config.secret
    const token = jwt.sign({ email}, secretKey, { expiresIn: "30m" });
    return token
  
};

/**
 * function to generate the password hash
 * @param {string} password 
 * @returns password hash
 */
function generateHash(password) {
    // Hashing user's password, 
    return crypto.createHash('sha256').update(password).digest("hex")
};

module.exports = {generateJwt, generateHash};

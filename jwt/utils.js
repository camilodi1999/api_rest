const jwt = require("jsonwebtoken");
const config = require("../config");
const crypto = require('crypto'); 




/**
 * generate the jwt token from the email user and it
 * expires in 30m
 * @param {username} username of the user logged 
 * @returns token
 */

function generateJwt(email) {
    const secret_key = config.secret
    const token = jwt.sign({ email}, secret_key, { expiresIn: "30m" });
    return token
  
};

/**
 * function to generate the password hash
 * @param {*} password 
 * @returns password hash
 */
function generateHash(password) {
    // Hashing user's password, 
    return crypto.createHash('sha256').update(password).digest("hex")
};

module.exports = {generateJwt, generateHash};

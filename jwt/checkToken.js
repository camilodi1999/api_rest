const jwt = require("jsonwebtoken");
const config = require("./config");

function checkToken(req, res, next) {
  //Gets the token from the request
  let token = req.cookies['jwt']

  //Check if the token exists
  if (token) {

    // Verify if there is a value for the token. if it exists, it is checked
    jwt.verify(token, config.secret, (err, decoded) => {
      // validate the token
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid",
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    //If there is no a token, throw an exception
    return res.json({
      success: false,
      message: "Auth token is not supplied",
    });
  }
}

module.exports = checkToken;

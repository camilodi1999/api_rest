var express = require('express');
var router = express.Router();
const User = require("../models/user");
const jwtUtils = require('../jwt/utils');
const checkToken = require("../jwt/checkToken");
const userUtils = require('../utils/userUtils')


const maxAgeToken = 30*1000*60; // 30 min in ms
/**
 * signup route
 */
router.post('/signup', function(req, res, next) {
  // gets the body from de request
   
  let body = req.body
  
  // validates the body according to the schema
  const {error} = userUtils.schema.validate(body);
  if(error){
    return res.status(403).send(error.details[0].message);
  }

  // checks if there is a user with the same email
  User.findOne({where:{ name: body.email }}).then((response)=>{
    

    if (response){
      res.status(403).send("User already exists")
      
    }else{
      
      // generates the hash of the password
      const password = jwtUtils.generateHash(body.password)
      
      // creates the user into the database
      User.create({name: body.name, 
                  phone:body.phone, 
                  age: body.age, 
                  email:body.email,
                  password})
                  .then((result) => {
                    
                    // creates the user and generates the token for the user 
                    json = result.toJSON()
                    console.log(json)
                    token = jwtUtils.generateJwt(result.email);
                    
                    // set the token into the cookie and sends the response
                    res.cookie('access_token',token, {httpOnly:true, maxAgeToken})
                    res.send({...json})  ;

                  })
                  .catch(err => {
                    
                    if (err.name === 'SequelizeUniqueConstraintError'){
                      res.status(403)
                    res.send({ status: 'error', message: err.errors[0].message});
                    }
                    else res.send({ status: 'error', message: err.message});
                  });
    }
    
  })

});

/**
 * Function for the user login
 */
router.post('/login', function(req, res, next) {

  /**
   * gets the body from the request
   */
  let body = req.body
  
  //finds that the user exists
   
  User.findOne({where:{ email: body.email }}).then((response)=>{
    // User exists
    if (response){
      // generate the hash of the password
      const password = jwtUtils.generateHash(body.password)

      const passwordSaved = response.password

      // check the password
      if ( password === passwordSaved) {
        //Authentication Succesful
        // generate the jwt token
        token = jwtUtils.generateJwt(body.email);
        
        json = response.toJSON();
        // sends the response
        const maxAge = 30*60*1000;
        res.cookie('jwt',token, {httpOnly:true,maxAge})
        res.send({...json})
      }else {
            res.send({
            success: false,
            message: "Authentication failed",
            });
        }
    // User does not exist
    }else{
        res.status(404).send("User not found")
    }
      
  })

});

/**
 * Logout the user
 */
router.post('/logout',function(req, res, next) {
  // expires the jwt
  res.cookie("jwt","",{ maxAge:0});
  res.send("User log out")
});

router.post('/restaurants', checkToken,function(req, res, next) {

});

module.exports = router;

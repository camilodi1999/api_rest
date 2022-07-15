var express = require('express');
var router = express.Router();
const User = require("../models/user")
const Joi = require('joi');
const utils = require('../jwt/utils')
const checkToken = require("../jwt/checkToken");
/**
 * schema of the user class for validation
 */
const schema = Joi.object({
  name: Joi.string()
      .min(3)
      .max(30)
      .required(),
  phone: Joi.number()
      .integer()
      .required(),
  age: Joi.number()
        .integer()
        .min(0)
        .max(100)
        .required(),
  email: Joi.string()
        .email()
        .required(),
  password: Joi.string()
        .alphanum()
        .min(8)
        .max(20)
});

/**
 * signup route
 */
router.post('/signup', function(req, res, next) {

  /**
   * gets the body from de request
   */
  let body = req.body
  
  /**
   * validates the body according to the schema
   */
  const {error} = schema.validate(body);
  if(error){
    return res.status(404).send(error.details[0].message);
  }

  /**
   * checks if there is a user with the same email
   */
  User.findOne({where:{ name: body.email }}).then((response)=>{
  
    if (response){
      res.status(404).send("User already exists")
      
    }else{
      /**
      * generates the hash of the password
      */
      const password = utils.generateHash(body.password)
      
      /**
      * creates the user into the database
      */
      User.create({name: body.name, 
                  phone:body.phone, 
                  age: body.age, 
                  email:body.email,
                  password})
                  .then((result) => {
                    /**
                     * generates the token for the user 
                     */
                    json = result.toJSON()
                    token = utils.generateJwt(result.email);
                    // set the token age to 30 minutes
                    const maxAge = 30*60*1000;
                    res.cookie('jwt',token, {httpOnly:true,maxAge})
                    res.send({...json})  ;
                  })
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
      const password = utils.generateHash(body.password)

      const passwordSaved = response.password

      // check the password
      if ( password === passwordSaved) {
        //Authentication Succesful
        // generate the jwt token
        token = utils.generateJwt(body.email);
        
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

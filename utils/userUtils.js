const Joi = require('joi');
const User = require("../models/user");



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
 * deletes the user from the database given its email
 * @param {email} email of the user 
 * @throw error if the user doesn't exist
 */
async function deleteUser(email) {

    const response = await User.destroy({
        where:{ 
            email:email 
    }});
    
    // User does not exists throw error
    if (response){}
    else throw new Error('The user does not exist');

};

  module.exports = {schema,deleteUser};
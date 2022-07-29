var express = require('express');
const { response } = require('../app');
var router = express.Router();
const Transaction = require("../models/transaction");



/**
 * Gets the historic transactions sorted by date descending
 * Optional: start and end parameters are required for the paginations
 * Optional: an user can be passed as a 
 * query param in order to get his
 * historic transactions
 */
router.get('/',function(req, res, next) {
  
  let query = {};

 // checks if the pagination params were passed
  const start = req.query.start;
  const end = req.query.end;

 
  let validation = true;
  if (start && end) {
    //includes the pagination in the query
    query.offset = start;
    query.limit = end;
    validation = !(isNaN(Number(start)) ||  isNaN(Number(end)))
    if (!validation) res.status(500).send("the pagination is not valid");
  }
  // checks if the user param was passed
  const user = req.query.user;
  
  // includes a where condition in the query
  if (user) query.where = {user}
  
  // validates the paginations params 
  
  if (validation){
    // finds the transactions according to the query passed
    Transaction.findAll(query).then(response=>{
      res.send(response);
    }).catch(error=>{
      res.status(500).send("cannot retrieve the transactions: "+ error.message);
    })
  }
  

  
});



module.exports = router;

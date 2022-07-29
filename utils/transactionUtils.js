const Transaction = require("../models/transaction");


/**
 * creates transactions in the database for test purposes
 * @param {int} size of the rows to create
 */
async function poblateTransactions(size) {
    
    const users = ['user1','user2'];
    for(let i=0;  i<size;i++){
        await Transaction.create({user:users[i%2]})
    }

};

/**
 * clear transactions in the database for test purposes
*/
async function clearTransactions() {
    
    await Transaction.destroy({where:{},truncate:true});
};

  module.exports = {poblateTransactions,clearTransactions};
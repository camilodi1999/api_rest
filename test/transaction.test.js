const request = require('supertest');
const app = require('../app');
const utils = require('../utils/transactionUtils');

const transactionEndpoint = "/transactions";
const size = 20

describe("Get historic transactions -> Endpoint get /transactions",()=>{

    describe("given an empty database",()=>{
        

        beforeAll(async ()=>{
            await utils.clearTransactions()
        });
        
        test("Should get a list empty and respond with a 200 status code", async ()=>{

            const response = await request(app).get(transactionEndpoint).send();
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(0);
        })    
  
    })

    describe("given transactions",()=>{
        
        //creates static rows in the database
        beforeAll(async ()=>{
            await utils.poblateTransactions(size);
        })
        //clear the database
        afterAll(async ()=>{
            await utils.clearTransactions()
        });
        
        test("Should get a list of 20 transactions and respond with a 200 status code", async ()=>{

            const response = await request(app).get(transactionEndpoint).send();
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(size);
        })   
        
        test("Should get a list of 10 transactions corresponding to one user and respond with a 200 status code", async ()=>{
            let url = `${transactionEndpoint}/?user=user1`;
            const response = await request(app).get(url).send();
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(size/2);
        })   
        
        test("Should get a list of 5 transactions corresponding half data of a user and respond with a 200 status code", async ()=>{
            const sizePagination = size/4
            let url = `${transactionEndpoint}/?user=user1&start=0&end=${sizePagination}`;
            const response = await request(app).get(url).send();
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(sizePagination);
        })   
        
        test("Given an empty user it should get the whole list and respond with a 200 status code", async ()=>{
            let url = `${transactionEndpoint}/?user=`;
            const response = await request(app).get(url).send();
            expect(response.statusCode).toBe(200);
            expect(response.body.length).toBe(size);
        })   
        
        test("Given an invalid pagination params it should respond with a 500 status code", async ()=>{
            let url = `${transactionEndpoint}/?start=as&end=vs`;
            const response = await request(app).get(url).send();
            expect(response.statusCode).toBe(500);
        }) 
  
    })
})
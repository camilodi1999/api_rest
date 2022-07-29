const request = require('supertest');
const app = require('../app');
const jwtUtils = require('../jwt/utils');
const userUtils = require('../utils/userUtils');

// I used static data but dinamyc data should be used instead

const userData = {
    name:"name_signup",
    phone: 1234,
    age: 12,
    email: "email_signup@email.com",
    password: "password"}


const signupEndpoint = "/user/signup";

describe("Register an user -> Endpoint POST user/signup",()=>{
    describe("given a user",()=>{
        
        beforeAll(async ()=>{
            try{
                await userUtils.deleteUser(userData.email)
            }
            //the user does not exist 
            catch{ }      
        });

        afterAll(async ()=>{ await userUtils.deleteUser(userData.email) });
        
        test("Should register the user and respond with a 200 status code", async ()=>{
            const response = await request(app).post(signupEndpoint).send(userData);
            password = jwtUtils.generateHash(userData.password);
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({...userData, password })
        });

        test("cannot register the same user twice", async ()=>{
            const response = await request(app).post(signupEndpoint).send(userData);
            expect(response.statusCode).toBe(403)
        });

        for (key in userData){
            test(`cannot register a user with invalid ${key} field`,async ()=>{
                const response = await request(app).post(signupEndpoint).send({...userData,[key]:''})
                expect(response.statusCode).toBe(403)
            })
        }
        
    })
})


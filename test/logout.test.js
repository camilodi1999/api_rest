const request = require('supertest');
const app = require('../app');
const jwtUtils = require('../jwt/utils');
const userUtils = require('../utils/userUtils');

// I used static data but dinamyc data should be used instead
const userData = {
    name:"name_logout",
    phone: 1234,
    age: 12,
    email: "email_logout@email.com",
    password: "password"}


const signupEndpoint = "/user/signup";
const logoutEndpoint = "/user/logout";

describe("logout an user -> Endpoint POST user/logout",()=>{

    

    describe("given a user logged in",()=>{
        
        
        

        afterAll(async ()=>{
            await userUtils.deleteUser(userData.email)
        });
        
        test("Should respond with a 200 status code even if there is no user logged in", async ()=>{

            const response = await request(app).post(logoutEndpoint).send();
            expect(response.statusCode).toBe(200);
        })    

        test("Should logout the user and respond with a 200 status code and the token is removed", async ()=>{
            const responseCookie = await request(app).post(signupEndpoint).send(userData);
            const response = await request(app).post(logoutEndpoint).set('Cookie',responseCookie.headers['set-cookie']).send();
            expect(response.statusCode).toBe(200);
            
        })     
    })
})
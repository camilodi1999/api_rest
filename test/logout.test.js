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


const signupEndpoint = "/signup";
const logoutEndpoint = "/logout";
let response_cookie = undefined;

describe("login an user -> Endpoint POST /login",()=>{
    describe("given a user",()=>{
        
        
        beforeAll(async ()=>{
            response_cookie = await request(app).post(signupEndpoint).send(userData);
        });

        afterAll(async ()=>{
            await userUtils.deleteUser(userData.email)
        });
        

        test("Should logout the user and respond with a 200 status code and the token is removed", async ()=>{

            const response = await request(app).post(logoutEndpoint).set('Cookie',response_cookie.headers['set-cookie']).send();
            
            expect(response.statusCode).toBe(200);
            const cookie = response.header['set-cookie'][0];
            const access_token = cookie.split(';')[0].split("=")[1];
            expect(access_token).toBe('');
            
        })

        // test("cannot login with an invalid password", async ()=>{
        //     const response = await request(app).post(loginEndpoint).send({
        //         email:userData.email,password:userData.password.substring(2)});
        //     expect(response.statusCode).toBe(404)
        // })        
    })
})
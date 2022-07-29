const request = require('supertest');
const app = require('../app');
const jwtUtils = require('../jwt/utils');
const userUtils = require('../utils/userUtils');

// I used static data but dinamyc data should be used instead
const userData = {
    name:"name_login",
    phone: 1234,
    age: 12,
    email: "email_login@email.com",
    password: "password"}

// endpoints required
const signupEndpoint = "/user/signup";
const loginEndpoint = "/user/login";
const logoutEndpoint = "/user/logout";


describe("login an user -> Endpoint POST user/login",()=>{
    describe("given a user",()=>{
        
        // creates an user and remove its credentials to test the login
        beforeAll(async ()=>{
            await request(app).post(signupEndpoint).send(userData);
            await request(app).post(logoutEndpoint);
        });

        // log out an delete user
        afterAll(async ()=>{
            await request(app).post(logoutEndpoint);
            await userUtils.deleteUser(userData.email)
        });
        

        test("Should login the user and respond with a 200 status code and the token is set", async ()=>{
            
            // request to the login endpoint
            const response = await request(app).post(loginEndpoint).send({
                email:userData.email,password:userData.password});
            // calculate hash password to compare the one logged in
            password = jwtUtils.generateHash(userData.password);
            // gets the access token to validate login
            const accessToken = response.header['set-cookie'][0]
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({...userData, password });
            expect(accessToken).toBeDefined();
        })

        
        test("cannot login with an invalid email", async ()=>{
            const response = await request(app).post(loginEndpoint).send({
                email:userData.email.substring(2),password:userData.password});
            expect(response.statusCode).toBe(404)
        })

        test("cannot login with an invalid password", async ()=>{
            const response = await request(app).post(loginEndpoint).send({
                email:userData.email,password:userData.password.substring(2)});
            expect(response.statusCode).toBe(404)
        })        
    })
})
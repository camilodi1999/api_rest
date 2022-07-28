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


const signupEndpoint = "/signup";
const loginEndpoint = "/login";
const logoutEndpoint = "/logout";


describe("login an user -> Endpoint POST /login",()=>{
    describe("given a user",()=>{
        

        beforeAll(async ()=>{
            await request(app).post(signupEndpoint).send(userData);
            await request(app).post(logoutEndpoint);
        });

        afterAll(async ()=>{
            await request(app).post(logoutEndpoint);
            await userUtils.deleteUser(userData.email)
        });
        

        test("Should login the user and respond with a 200 status code and the token is set", async ()=>{
            const response = await request(app).post(loginEndpoint).send({
                email:userData.email,password:userData.password});
            
            password = jwtUtils.generateHash(userData.password);
            token = jwtUtils.generateJwt(userData.email);
            access_token = response.header['set-cookie'][0].split(';')[0].split("=")[1]
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({...userData, password });
            expect(access_token).not.toBe('');
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
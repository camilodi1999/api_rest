const request = require('supertest');
const app = require('./app')
const jwtUtils = require('./jwt/utils')
const userUtils = require('./utils/userUtils')

const userdata = {
    name:"name",
    phone: 1234,
    age: 12,
    email: "email@email.com",
    password: "password"   
};

describe("Register an user -> Endpoint POST /signup",()=>{
    describe("given a user",()=>{
        const signupEndpoit = "/signup";

        beforeAll(()=>{
            userUtils.deleteUser(userdata.email).catch(()=>{
                //the user does not exist
            });
        });

        afterAll(()=>userUtils.deleteUser(userdata.email));
        
        test("Should register the user and respond with a 200 status code", async ()=>{
            const response = await request(app).post(signupEndpoit).send(userdata);
            
            password = jwtUtils.generateHash(userdata.password);
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({...userdata, password })
        })
        test("cannot register the same user twice", async ()=>{
            const response = await request(app).post(signupEndpoit).send(userdata);
            expect(response.statusCode).toBe(403)
        })

        for (key in userdata){
            test(`cannot register a user with invalid ${key} field`,async ()=>{
                const response = await request(app).post(signupEndpoit).send({...userdata,[key]:''})
                expect(response.statusCode).toBe(403)
            })
        }
        
    })
})


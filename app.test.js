const supertest  = require('supertest')
const app = require('./app')


describe("POST /signup",()=>{
    describe("given a user",()=>{
        test("Should create the user and responde with a 200 status code", async ()=>{
            const response = await supertest(app).post("/signup").send({
                name:"name",
                phone: 1234,
                age: 12,
                email: "email@email.com",
                password: "password"   
            });
            expect(response.statusCode).toBe(200)
        })
        test("cannot create the same user twice", async ()=>{
            const response = await supertest(app).post("/signup").send({
                name:"name",
                phone: 1234,
                age: 12,
                email: "email@email.com",
                password: "password"   
            });
            expect(response.statusCode).toBe(403)
        })
    })
})
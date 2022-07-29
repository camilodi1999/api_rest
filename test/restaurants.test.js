const request = require('supertest');
const app = require('../app');
const userUtils = require('../utils/userUtils');

// I used static data but dinamyc data should be used instead

const userData = {
    name:"name_restaurants",
    phone: 1234,
    age: 12,
    email: "email_restaurants@email.com",
    password: "password"}

const queryData = {
    place: 'Candelaria',
    lat: '4.602942',
    lon: '-74.065348',
}

const signupEndpoint = "/user/signup";
const logoutEndpoint = "/user/logout";
const restaurantsEndpoint = "/restaurants"

describe("Get a list of restaurants -> Endpoint GET /restaurants",()=>{

    describe("given an user who is not logged in",()=>{
        
        // Assures that there is no user logged in
        beforeAll(async ()=>{
            try{
                await request(app).post(logoutEndpoint);
            }
             
            catch(exception){ }      
        });

        test("Should not get a list of restaurants, and respond with a 401 status code", async()=>{
            
            const url = `${restaurantsEndpoint}/?place=${queryData.place}&?lat=${queryData.lat}&?lon=${queryData.lon}`
            const response = await request(app).get(url);
            expect(response.statusCode).toEqual(401);
            expect(response.body.message).toEqual("Auth token is not supplied");
            expect(response.body.success).not.toBeTruthy();

        });
    });

    describe("given an user who is logged in",()=>{
        
        let responseToken = null;
        // gets an user authenticated
        beforeAll(async ()=>{
            try{
                responseToken = await request(app).post(signupEndpoint).send(userData);
            }
             
            catch(exception){ }      
        });

        afterAll(async ()=>{ await userUtils.deleteUser(userData.email) });

        test("When passing a place and a location it should get a list of restaurants, and respond with a 200 status code", async()=>{
            
            const url = `${restaurantsEndpoint}/?place=${queryData.place}&lat=${queryData.lat}&lon=${queryData.lon}`
            
            const response = await request(app).get(url).set('Cookie',responseToken.headers['set-cookie']).send();
            expect(response.statusCode).toEqual(200);
            expect(response.body).toBeDefined();

        });

        test("When passing just a place it should get a list of restaurants, and respond with a 200 status code", async()=>{
            
            const url = `${restaurantsEndpoint}/?place=${queryData.place}`;
            
            const response = await request(app).get(url).set('Cookie',responseToken.headers['set-cookie']).send();
            expect(response.statusCode).toEqual(200);
            expect(response.body).toBeDefined();

        });

        test("When passing just a location it should get a list of restaurants, and respond with a 200 status code", async()=>{
            
            const url = `${restaurantsEndpoint}/?lat=${queryData.lat}&lon=${queryData.lon}`;
            const response = await request(app).get(url).set('Cookie',responseToken.headers['set-cookie']).send();
            expect(response.statusCode).toEqual(200);
            expect(response.body).toBeDefined();

        });

        test("When passing no parameters it should not get a list of restaurants, and respond with a 500 status code", async()=>{
            
            const url = `${restaurantsEndpoint}/`;
            
            const response = await request(app).get(url).set('Cookie',responseToken.headers['set-cookie']).send();
            expect(response.statusCode).toEqual(500);
            expect(response.error.text).toEqual("The coordinates and the place are not defined");

        });

        test("When passing empty parameters it should respond with a 500 status code", async()=>{
            
            const url = `${restaurantsEndpoint}/?place=&lat=&lon=`
            
            const response = await request(app).get(url).set('Cookie',responseToken.headers['set-cookie']).send();
            expect(response.statusCode).toEqual(500);
            expect(response.error.text).toEqual("The coordinates and the place are not defined");

        });

        test("When passing wrong latitude it should respond with a 500 status code", async()=>{
            
            const url = `${restaurantsEndpoint}/?lat=aa&lon=${queryData.lon}`
            
            const response = await request(app).get(url).set('Cookie',responseToken.headers['set-cookie']).send();
            expect(response.statusCode).toEqual(500);
            expect(response.error.text).toEqual("An error occurred while doing the search: the latitude is not valid");
        });

        test("When passing wrong longitude it should respond with a 500 status code", async()=>{
            
            const url = `${restaurantsEndpoint}/?lat=${queryData.lat}&lon=aad`
            
            const response = await request(app).get(url).set('Cookie',responseToken.headers['set-cookie']).send();
            expect(response.statusCode).toEqual(500);
            expect(response.error.text).toEqual("An error occurred while doing the search: the longitude is not valid")
        });
    });
});


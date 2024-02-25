const { use } = require("chai")

const expect = require("chai").expect
const request = require("supertest")("https://kasir-api.belajarqa.com")
var token = ''
var userId =''
describe("Authorization", async()=>{
    it("Negative Case - Registrtion User Status Code must != 201", async ()=>{
        const data = 
        {
        "name":"",
        "email":"",
        "password":""
        }
        
        const response = await request
        .post('/registration')
        .send(data)
        expect(await response.statusCode).not.to.eql(201)
    })
    it("Registration User Status Code must == 201", async ()=>{
        const data = 
        {
        "name":"helda",
        "email":"helda@mail.com",
        "password":"helda123"
        }
        
        const response = await request
        .post('/registration')
        .send(data)
        expect(await response.statusCode).to.eql(201)
        expect(await response.body.data.name).to.eql("helda")
    })

    it("Negative Case - Login User Status Code must != 201",async()=>{
        const data =
        {
            "email":"",
            "password":""
        }
        const response = await request
        .post('/authentications')
        .send(data)

        console.log("Login Status Code : ",response.statusCode)
        expect(await response.statusCode).not.to.eql(201)
    })

    it("Login User Status Code must == 200",async()=>{
        const data =
        {
            "email":"helda@mail.com",
            "password":"helda123"
        }
        const response = await request
        .post('/authentications')
        .send(data)
        token = await response.body.data.accessToken

        console.log("Login Status Code : ",response.statusCode)
        expect(await response.statusCode).to.eql(201)
    })

})

describe("User",async()=>{
    const epUser = '/users'
    const body =
    {
        "name": "helda",
        "email": "helda@mail.com",
        "password": "helda123"
     }
     
     it("Negative Case - Create User",async()=>{
         const response = await request
         .post(epUser)
         .send(body).set({
            Authorization: `Bearer null`
         })
         if(await response.statusCode == 201){
            userId = await response.body.data.userId
         }
         console.log(await response.body.message)
         expect(await response.statusCode).not.to.eql(201)
    })

     it("Create User",async()=>{
         const response = await request
         .post(epUser)
         .send(body).set({
            Authorization: `Bearer ${token}`
         })
         console.log("data: ",await response.body.data)
         if(await response.statusCode == 201){
            userId = await response.body.data.userId
         }

         expect(await response.statusCode).to.eql(201)
    })

    it("Negative Case - Get User Detail",async()=>{
        const response = await request.get(`${epUser}/invalidId`).set({
            ContentType: 'application/json',
            Authorization: `Bearer ${token}`
        })
        console.log(await response.body.message)
        expect(await response.statusCode).not.to.eql(200)
    })

    it("Get User Detail",async()=>{
        const response = await request.get(`${epUser}/${userId}`).set({
            ContentType: 'application/json',
            Authorization: `Bearer ${token}`
        })
        console.log("data: ",await response.body.data.user)
        expect(await response.statusCode).to.eql(200)
    })

    it("Negative Case - Update User",async()=>{
        const dataUpdate =
        {
            "name":"karina",
            "email": ""
        }
        const response = await request.put(`${epUser}/${userId}`)
        .send(dataUpdate)
        .set({
            ContentType: 'application/json',
            Authorization: `Bearer ${token}`
        })
        console.log(await response.body.message)
        expect(await response.statusCode).not.to.eql(200)
    })

    it("Update User",async()=>{
        const dataUpdate =
        {
            "name":"karina",
            "email": "helda@mail.com"
        }
        const response = await request.put(`${epUser}/${userId}`)
        .send(dataUpdate)
        .set({
            ContentType: 'application/json',
            Authorization: `Bearer ${token}`
        })
        console.log(await response.body.message)
        expect(await response.statusCode).to.eql(200)
        expect(await response.body.data.name).to.eql(dataUpdate.name)
    })

    it("Negative Case - Delete User",async()=>{

        const response = await request.delete(`${epUser}/invalidId`)
        .set({
            Authorization: `Bearer ${token}`
        })
        console.log(await response.body.message)
        expect(await response.statusCode).not.to.eql(200)
    })
    
    it("Delete User",async()=>{

        const response = await request.delete(`${epUser}/${userId}`)
        .set({
            Authorization: `Bearer ${token}`
        })
        console.log(await response.body.message)
        expect(await response.statusCode).to.eql(200)
    })

});
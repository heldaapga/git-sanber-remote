const { use } = require("chai")

const expect = require("chai").expect
const request = require("supertest")("https://kasir-api.belajarqa.com")
var token = ''
var unitId =''

describe("Authorization", async()=>{
    it("Login User Status Code must == 200",async()=>{
        const data =
        {
            "email":"sunny@mail.com",
            "password":"sun123"
        }
        const response = await request
        .post('/authentications')
        .send(data)
        token = await response.body.data.accessToken

        console.log("Login Status Code : ",response.statusCode)
        expect(await response.statusCode).to.eql(201)
    })

})
describe("Unit",async()=>{
    const epUnit = '/units'
    const body =
    {
        "name": "kilogram",
        "description": "weight measurement",
     }
     
     it("Negative Case - Create Unit",async()=>{
         const response = await request
         .post(epUnit)
         .send(body).set({
            Authorization: `Bearer null`
         })
         if(await response.statusCode == 201){
            unitId = await response.body.data.unitId
         }
         console.log(await response.body.message)
         expect(await response.statusCode).not.to.eql(201)
    })

     it("Create Unit",async()=>{
         const response = await request
         .post(epUnit)
         .send(body).set({
            Authorization: `Bearer ${token}`
         })
         console.log("data: ",await response.body.data)
         if(await response.statusCode == 201){
            unitId = await response.body.data.unitId
         }

         expect(await response.statusCode).to.eql(201)
    })

    it("Negative Case - Get Unit Detail",async()=>{
        const response = await request.get(`${epUnit}/invalidId`).set({
            ContentType: 'application/json',
            Authorization: `Bearer ${token}`
        })
        console.log(await response.body.message)
        expect(await response.statusCode).not.to.eql(200)
    })

    it("Get Unit Detail",async()=>{
        const response = await request.get(`${epUnit}/${unitId}`).set({
            ContentType: 'application/json',
            Authorization: `Bearer ${token}`
        })
        console.log("data: ",await response.body.data.unit)
        expect(await response.statusCode).to.eql(200)
    })

    it("Update Unit",async()=>{
        const dataUpdate =
        {
            "name":"miligram",
            "description": "weight measurement"
        }
        const response = await request.put(`${epUnit}/${unitId}`)
        .send(dataUpdate)
        .set({
            ContentType: 'application/json',
            Authorization: `Bearer ${token}`
        })
        console.log(await response.body.status)
        expect(await response.statusCode).to.eql(200)
        expect(await response.body.data.name).to.eql(dataUpdate.name)
    })

    it("Negative Case - Delete Unit",async()=>{

        const response = await request.delete(`${epUnit}/invalidId`)
        .set({
            Authorization: `Bearer ${token}`
        })
        console.log(await response.body.message)
        expect(await response.statusCode).not.to.eql(200)
    })
    
    it("Delete Unit",async()=>{

        const response = await request.delete(`${epUnit}/${unitId}`)
        .set({
            Authorization: `Bearer ${token}`
        })
        console.log(await response.body.status)
        expect(await response.statusCode).to.eql(200)
    })

});
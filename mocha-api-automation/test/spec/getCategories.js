const { use } = require("chai")

const expect = require("chai").expect
const request = require("supertest")("https://kasir-api.belajarqa.com")
var token = ''
var categoryId =''

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
describe("Category",async()=>{
    const epCategory = '/categories'
    const body =
    {
        "name": "Mie Sakura",
        "description": "makanan instan dari indofood"
     }     
     
     it("Negative Case - Create Category",async()=>{
         const response = await request
         .post(epCategory)
         .send(body).set({
            Authorization: `Bearer null`
         })
         if(await response.statusCode == 201){
            categoryId = await response.body.data.categoryId
         }
         console.log(await response.body.message)
         expect(await response.statusCode).not.to.eql(201)
    })

     it("Create Category",async()=>{
         const response = await request
         .post(epCategory)
         .send(body).set({
            Authorization: `Bearer ${token}`
         })
         console.log("data: ",await response.body.data)
         if(await response.statusCode == 201){
            categoryId = await response.body.data.categoryId
         }

         expect(await response.statusCode).to.eql(201)
    })

    it("Negative Case - Get Category Detail",async()=>{
        const response = await request.get(`${epCategory}/invalidId`).set({
            ContentType: 'application/json',
            Authorization: `Bearer ${token}`
        })
        console.log(await response.body.message)
        expect(await response.statusCode).not.to.eql(200)
    })

    it("Get Category Detail",async()=>{
        const response = await request.get(`${epCategory}/${categoryId}`).set({
            ContentType: 'application/json',
            Authorization: `Bearer ${token}`
        })
        console.log("data: ",await response.body.data.category)
        expect(await response.statusCode).to.eql(200)
    })

    it("Update Category",async()=>{
        const dataUpdate =
        {
            "name":"Pop Mie",
            "description": "makanan instan dari indofood"
        }
        const response = await request.put(`${epCategory}/${categoryId}`)
        .send(dataUpdate)
        .set({
            ContentType: 'application/json',
            Authorization: `Bearer ${token}`
        })
        console.log(await response.body.status)
        expect(await response.statusCode).to.eql(200)
        expect(await response.body.data.name).to.eql(dataUpdate.name)
    })

    it("Negative Case - Delete Category",async()=>{

        const response = await request.delete(`${epCategory}/invalidId`)
        .set({
            Authorization: `Bearer ${token}`
        })
        console.log(await response.body.message)
        expect(await response.statusCode).not.to.eql(200)
    })
    
    it("Delete Categories",async()=>{

        const response = await request.delete(`${epCategory}/${categoryId}`)
        .set({
            Authorization: `Bearer ${token}`
        })
        console.log(await response.body.status)
        expect(await response.statusCode).to.eql(200)
    })

});
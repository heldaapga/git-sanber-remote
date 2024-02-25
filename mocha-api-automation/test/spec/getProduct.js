const { use } = require("chai")

const expect = require("chai").expect
const request = require("supertest")("https://kasir-api.belajarqa.com")
var token = ''
var productId =''

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
describe("Product",async()=>{
    const epProduct = '/products'
    const body =
    {
        "category_id" : "575f547e-a24e-4f94-bfe1-b7ed7d11c03f",
        "code": "A304ASDDFIER3432",
        "name": "Coklat",
        "price": "2000",
        "cost": "1500",
        "stock": "200"
     }     
     
     it("Negative Case - Create Product",async()=>{
         const response = await request
         .post(epProduct)
         .send(body).set({
            Authorization: `Bearer null`
         })
         if(await response.statusCode == 201){
            productIdId = await response.body.data.productIdId
         }
         console.log(await response.body.message)
         expect(await response.statusCode).not.to.eql(201)
    })

     it("Create Product",async()=>{
         const response = await request
         .post(epProduct)
         .send(body).set({
            Authorization: `Bearer ${token}`
         })
         console.log("data: ",await response.body.data)
         if(await response.statusCode == 201){
            productId = await response.body.data.productId
         }

         expect(await response.statusCode).to.eql(201)
    })

    it("Negative Case - Get Product Detail",async()=>{
        const response = await request.get(`${epProduct}/invalidId`).set({
            ContentType: 'application/json',
            Authorization: `Bearer ${token}`
        })
        console.log(await response.body.message)
        expect(await response.statusCode).not.to.eql(200)
    })

    it("Get Product Detail",async()=>{
        const response = await request.get(`${epProduct}/${productId}`).set({
            ContentType: 'application/json',
            Authorization: `Bearer ${token}`
        })
        console.log("data: ",await response.body.data.product)
        expect(await response.statusCode).to.eql(200)
    })

    it("Update Product",async()=>{
        const dataUpdate =
        {
            "category_id" : "575f547e-a24e-4f94-bfe1-b7ed7d11c03f",
            "code": "A304ASDDFIER3432",
            "name": "Strawberry",
            "price": "2000",
            "cost": "1500",
            "stock": "200"
        }
        const response = await request.put(`${epProduct}/${productId}`)
        .send(dataUpdate)
        .set({
            ContentType: 'application/json',
            Authorization: `Bearer ${token}`
        })
        console.log(await response.body.status)
        expect(await response.statusCode).to.eql(200)
        expect(await response.body.data.name).to.eql(dataUpdate.name)
    })

    it("Negative Case - Delete Product",async()=>{

        const response = await request.delete(`${epProduct}/invalidId`)
        .set({
            Authorization: `Bearer ${token}`
        })
        console.log(await response.body.message)
        expect(await response.statusCode).not.to.eql(200)
    })
    
    it("Delete Product",async()=>{

        const response = await request.delete(`${epProduct}/${productId}`)
        .set({
            Authorization: `Bearer ${token}`
        })
        console.log(await response.body.message)
        expect(await response.statusCode).to.eql(200)
    })

});
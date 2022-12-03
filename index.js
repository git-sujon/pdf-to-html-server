const express = require('express')
const app= express()
const cors= require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()


const port =env.process.PORT || 5000

app.use(express.json())
app.use()



const uri = `mongodb+srv://${process.env.pdf_To_Html_DB_USER}:${process.env.pdf_To_Html_DB_PASS}@cluster0.prabmlk.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const run = async() =>{
    const userInfoCollection= client.db('PdfToHtml').collection('userInfoCollection')

    try{

        // Read users data 

        app.get(`/usersInfo`, async(res, req)=> {
            const result = await userInfoCollection.find({}).toArray()
            res.send(result)
        })

        // create users data 
        app.post(`/usersInfo`, async(res, req)=> {
            const usersInfo= req.body
            const result = await userInfoCollection.insertOne(usersInfo)
            res.send(result)
          
        })

      

        
    }



    finally{

    }
}

run().catch(err => console.error(err))




app.get('/', (req, res)=> {
    res.send("PDF to HTML is Running")
})

app.listen(port, ()=> {
    console.log(port, "IS RUnning")
})
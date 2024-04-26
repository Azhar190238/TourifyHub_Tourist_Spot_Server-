const express = require('express');
const cors = require('cors');
const app=express();
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000; 
 
// middleware

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ieebpm5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // database connection
    const coffeeCollection = client.db('tourismDB').collection('tourism');
    const userCollection =client.db('coffeeDB').collection('tourist');
    
// // read operation 
//     app.get('/coffee', async(req,res)=>{
//         const cursor= coffeeCollection.find();
//         const result= await cursor.toArray();
//         res.send(result);
//     })

//     //specific data read

//     app.get('/coffee/:id', async(req, res) =>{
//         const id= req.params.id;
//         const query= { _id: new ObjectId(id)}
//         const result = await coffeeCollection.findOne(query);
//         res.send(result);
//     })
//     // data insert or create operation 
//     app.post('/coffee', async(req,res)=>{
//         const newCoffee = req.body;
//         console.log(newCoffee);
//         const result= await coffeeCollection.insertOne(newCoffee);
//         res.send(result);

//     })

//     // upadted or put operation
//     app.put('/coffee/:id', async(req, res) =>{
//         const id= req.params.id;
//         const filter= { _id: new ObjectId(id)}
//         const options= {upsert:true};
//         const updatedCoffee = req.body;
//         const coffee ={
//             $set:{
//                 name: updatedCoffee.name,
//                 chef: updatedCoffee.chef,
//                 supplier: updatedCoffee.supplier,
//                 taste: updatedCoffee.taste,
//                 category: updatedCoffee.category,
//                 details: updatedCoffee.details,
//                 photo: updatedCoffee.photo
//             }
//         }
//         const result = await coffeeCollection.updateOne(filter,coffee,options);
//         res.send(result);
//     })

//          // data remove or delete operation
//          app.delete('/coffee/:id', async(req, res) =>{
//             const id= req.params.id;
//             const query= { _id: new ObjectId(id)}
//             const result = await coffeeCollection.deleteOne(query);
//             res.send(result);
//         })


//         // User related APIs

//         // read operation 
//     app.get('/user', async(req,res)=>{
//         const cursor= userCollection.find();
//         const result= await cursor.toArray();
//         res.send(result);
//     })


//  // data insert or create operation 
//  app.post('/user', async(req,res)=>{
//     const user = req.body;
//     console.log(user);
//     const result= await userCollection.insertOne(user);
//     res.send(result);

// })

//  // upadted or put operation
//  app.patch('/user', async(req, res) =>{
//     const user = req.body;
//     const filter={email: user.email} 
//     const updatedDoc ={
//         $set:{
//             lastLoggedAt: user.lastLoggedAt  
//         }
//     }
//     const result = await userCollection.updateOne(filter,updatedDoc);
//     res.send(result);
// })

// // delete operation 
 
// app.delete('/user/:id', async(req, res) =>{
//     const id= req.params.id;
//     const query= { _id: new ObjectId(id)}
//     const result = await userCollection.deleteOne(query);
//     res.send(result);
// })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('Coffee making server is running....')
})

app.listen(port,()=>{
    console.log(`Coffee server is running on port : ${port}`)
})
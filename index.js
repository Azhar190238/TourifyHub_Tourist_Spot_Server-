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
    
    // await client.connect();
    // database connection
    const spotCollection = client.db('tourismDB').collection('tourism');
    const countryCollection =client.db('tourismDB').collection('countries');
    
// read operation 
    app.get('/addSpot', async(req,res)=>{
        const cursor= spotCollection.find();
        const result= await cursor.toArray();
        res.send(result);
    })



    //specific data read

    app.get('/addSpot/:id', async(req, res) =>{
        const id= req.params.id;
        const query= { _id: new ObjectId(id)}
        const result = await spotCollection.findOne(query);
        res.send(result);
    })

      //specific data read send to email

      app.get('/myList/:id', async(req, res) =>{
        const id= req.params.id;
        const result = await spotCollection.find({email:id}).toArray();
        res.send(result);
    })
    // data insert or create operation 
    app.post('/addSpot', async(req,res)=>{
      const newSpot = req.body;
      console.log(newSpot);
      const result= await spotCollection.insertOne(newSpot);
      res.send(result);

  })

    // upadted or put operation
    app.put('/addSpot/:id', async(req, res) =>{
        const id= req.params.id;
        const filter= { _id: new ObjectId(id)}
        const options= {upsert:true};
        const updatedSpot = req.body;
        const tourist ={
            $set:{
              country_name: updatedSpot.country_name,
              spot_name: updatedSpot.spot_name,
                description: updatedSpot.description,
                seasonality: updatedSpot.seasonality,
                cost: updatedSpot.cost,
                time: updatedSpot.time,
                visitors_per_year: updatedSpot.visitors_per_year,
                location: updatedSpot.location,
                photo: updatedSpot.photo
               
            }
        }
        const result = await spotCollection.updateOne(filter,tourist,options);
        res.send(result);
    })

         // data remove or delete operation
         app.delete('/addSpot/:id', async(req, res) =>{
            const id= req.params.id;
            const query= { _id: new ObjectId(id)}
            const result = await spotCollection.deleteOne(query);
            res.send(result);
        })


    // read operation for countries 
    app.get('/countries', async(req,res)=>{
      const country= countryCollection.find();
      const result= await country.toArray();
      res.send(result);
  })

  // read operation for same countries 

  app.get('/countries/:country_name', async (req, res) => {
    const countryName = req.params.country_name;
    const query = { country_name: countryName }; // Query by country_name directly
    const result = await countryCollection.findOne(query);
    res.send(result);
});


app.get('/allCountry/:id', async(req, res) =>{
  const id= req.params.id;
  const result = await spotCollection.find({country_name:id}).toArray();
  res.send(result);
})

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send('Tourist Spot create making server is running....')
})

app.listen(port,()=>{
    console.log(`Tourist server is running on port : ${port}`)
})

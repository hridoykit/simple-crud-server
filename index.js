const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://spark1:A8jtIB40dVmnBuCt@cluster0.ylarr1i.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
})

app.get('/', (req, res) => {
  res.send('root route is testing')
})

async function run() {
  try {
    await client.connect();

    const userCol = client.db("usersDb").collection("users");

    // READ many 
    app.get('/users', async (req, res) => {
      const result = await userCol.find({}).toArray();

      res.send(result);
    });

    // get specific user data
    app.get('/users/:id', async(req, res) => {
      const id = req.params.id;
      const filter = {_id: new ObjectId(id)};
      const filteredUser = await userCol.findOne(filter);

      res.send(filteredUser);
    });

    // UPDATE
    app.put('/users/:id', async(req, res) => {
      const id = req.params.id;
      const user = req.body;
      // console.log(id, user);
      const filter = {_id : new ObjectId(id)};
      const options = {upsert: true};
      const update = { $set: {
        name: user.name,
        email: user.email
      }};
      const updatedUser = await userCol.updateOne(filter, update, options);

      res.send(updatedUser);
    })

    // CREATE
    app.post('/users', async (req, res) => {
      const user = req.body;
      const insertedUser = await userCol.insertOne(user);

      res.send(insertedUser);
    });

    // DELETE
    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      const qurey = {_id: new ObjectId(id)};
      const deletedUser = await userCol.deleteOne(qurey);
      

      res.send(deletedUser);
    });


    await client.db("admin").command({ ping: 1 });
    console.log("ping: connected to MongoDB successfully");
    
  } finally {
    // await client.close();
  }
}
run().catch(err => console.log(err));

app.listen(port, () => {
    console.log(`simple CRUD is running port: ${port}`)
});

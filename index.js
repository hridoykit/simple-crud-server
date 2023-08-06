const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
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

    app.get('/users', async (req, res) => {
      const cursor = userCol.find();
      const result = await cursor.toArray();

      res.send(result);
    })

    app.post('/users', async (req, res) => {
      const user = req.body;
      const result = await userCol.insertOne(user);
      
      res.send(result);
    })


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

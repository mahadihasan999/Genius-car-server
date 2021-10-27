const express = require('express');

const { MongoClient } = require('mongodb');

const ObjectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;
//middlware
app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h7wek.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db('carMechanics')
        const servicesCollection = database.collection('service');
        //Get API
        app.get('/services', async (req, res) => {
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })

        //Get Single API
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await servicesCollection.findOne(query);
            res.json(service)
        })

        //Post API
        app.post('/services', async (req, res) => {
            const service = req.body
            console.log('hit the  post api', service);
            res.send('post hitten');

            const result = await servicesCollection.insertOne(service);
            res.json(result);
        });
    }

    finally {

    }
}

run().catch(console.dir)

app.get('/', (req, res) => {
    res.send(' Running Genius Server');
})


app.get('/hello', (req, res) => {

    res.send('updated succesfuly')
})
app.listen(port, () => {
    console.log('Running G Server on Port', port)
})

/*
one time:
1. heroku account open
2. heroku sotware install

 Every Project
 1. git init
 2. .gitignore (node_module, .env)
 3. push ev3erything to hit
 4. make sure you habe this cript: " start": "node index.js"
 5. make sure: put process.env.PORT in front of your port number
 6. heroku login
 7. heroku create(only one tim efo ra porject)
 8. command : git push heroku maain
 ----------
 update
 save  everything check locally
 1. git add, git commit-m" , git push
 2. git push herku main
*/
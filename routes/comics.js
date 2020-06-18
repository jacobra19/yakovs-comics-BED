require('dotenv').config()

var express = require('express');
var router = express.Router();

const mongo = require('mongodb').MongoClient
const url = process.env.MONGO_CRED+process.env.MONGO_URI
var db;

mongo.connect(
    url, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, 
    (err, client) => {
    if (err) {
        console.error(err)
        return
    }
    db = client.db('yakovs-comics')
    }
)

router.get('/', function(req, res, next) {
    const collection = db.collection('comics')

    collection
    .find({})
    .toArray()
    .then((arr)=>{
        // console.log('arr.length', arr.length)
        res.send(arr)
    })
    .catch((err)=>{
        // console.log('err', err)
        res.send([])
    })
});


router.get('/publishers/:value', (req, res)=> {
    const collection = db.collection('comics')

    collection
    .find({'publish.title':req.params.value})
    .toArray()
    .then((data)=>{
        if(data){
            return res.send(data);
        }
    })
    .catch((err)=>{
        res.send([])
    })
});

router.post('/new/', function(req, res) {
    const collection = db.collection('comicsGlobalPool')

    console.log('post')
    console.log('typeof req.body.entries', typeof req.body.entries)
    console.log('req.body', req.body)
    let test = JSON.stringify(req.body,null,4)
    console.log('typeof test',typeof test)

    collection.insertMany(req.body.entries)

    // collection
    // .find({})
    // .toArray()
    // .then((arr)=>{
    //     // console.log('arr.length', arr.length)
        res.send('test is good')
    // })
    // .catch((err)=>{
    //     // console.log('err', err)
    //     res.send([])
    // })
});

module.exports = router;

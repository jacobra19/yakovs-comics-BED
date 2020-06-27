require('dotenv').config()

var express = require('express');
var router = express.Router();

const mongo = require('mongodb').MongoClient
const url = process.env.MONGO_CRED+process.env.MONGO_URI
const writeUrl = process.env.MONGO_ADMIN+process.env.MONGO_URI
var db;
// var dbComicsGlobalPool;

mongo.connect(
    writeUrl, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, 
    (err, client) => {
    if (err) {
        console.error(err)
        return
    }
    console.log('mongo.connect')
    console.log('url', url)
    console.log('writeUrl', writeUrl)
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
    const collection = db.collection('testCollection')

    // console.log('post')
    // console.log('typeof req.body.entries', typeof req.body.entries)
    // console.log('req.body', req.body)
    // let test = JSON.stringify(req.body,null,4)
    // console.log('typeof test',typeof test)
    console.log('req.body.entries',req.body.entries)
    let insertManyRes = collection.insertMany(req.body.entries)
    // console.log('insertManyRes', insertManyRes)

    insertManyRes.then(promRes=>{
        console.log('promRes', promRes)
    })
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

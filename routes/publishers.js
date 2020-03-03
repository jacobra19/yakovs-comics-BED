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



/* GET publishers listing. */
router.get('/', function(req, res, next) {
    const collection = db.collection('comics')

    collection
    .distinct('publish.title')
    .then((arr)=>{
        res.send(arr)
    })
    .catch((err)=>{
        res.send([])
    })
});


module.exports = router;

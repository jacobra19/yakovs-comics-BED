require('dotenv').config()

const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');
const url = process.env.MONGO_CRED+process.env.MONGO_URI

mongoose.connect(url, {useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var Schema = mongoose.Schema;

var ComicBookModelSchema = new Schema({
    _id: ObjectID,
    publish: {
        title: String,
        date: String
    },
    media: {
      coverSrc: String
    },
    series: {
      title: String,
      issue: String
    },
    description: String,
    saga: {
      title: String,
      currentIssue: String,
      totalIssues: String
    },
    variant: String,
    creators: {
      coverArtBy: [],
      writtenBy: [],
      pencilsBy: [],
      inksBy: []
    }
});

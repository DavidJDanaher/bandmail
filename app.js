var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var app = require('./api/routes.js');

// Connection URL
var url = 'mongodb://localhost:27017/bandmail';
var insertFans;
var findFans;

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  // findFans(db, function(){
  //   db.close();
  // });
});

function insertFans(db, callback) {
    var collection = db.collection('documents');

    collection.insertMany([{name: 'Bob'}, {name: 'Bill'}], function(err, result){
        assert.equal(err, null);
        assert.equal(2, result.result.n);
        assert.equal(2, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}

function findFans(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

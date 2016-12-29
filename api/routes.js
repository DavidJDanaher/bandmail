var express = require('express');
var dbClient = require('mongodb').MongoClient;
var assert = require('assert');

var app = express();
var dbUrl = 'mongodb://localhost:27017/bandmail';
var apiPort = 5555;

app.listen(apiPort);

dbClient.connect(dbUrl, function(err, db) {
    var collection = db.collection('fans');

    assert.equal(null, err);
    console.log('Connected successfully to server');

    app.get('/', function(req, res) {
        var message;

        collection.find().toArray(function(err, docs) {
            assert.equal(err, null);
            if (docs.length > 0) {
                console.log('Found the following records');
                console.log(docs);
            } else {
                console.log('No records found.');
            }

        });
        res.send('GET request');
    });

});

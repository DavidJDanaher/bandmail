var express = require('express');
var dbClient = require('mongodb').MongoClient;
var assert = require('assert');

var app = express();
var dbUrl = 'mongodb://localhost:27017/bandmail';
var apiPort = 5555;

app.listen(apiPort);

dbClient.connect(dbUrl, function(err, db) {
    var collection = db.collection('fans');
    var response = { message: '', data: null};

    assert.equal(null, err);
    console.log('Connected successfully to server');

    app.get('/', function(req, res) {
        collection.find().toArray(function(err, records) {
            assert.equal(err, null);
            response.data = records;
console.log(req);
            if (records.length > 0) {
                console.log('Found the following records');
                console.log(records);
                response.message = 'Found the following records';
            } else {
                console.log('No records found.');
                response.message = 'No records found';
            }
        });

        res.send(response);
    });

    app.post('/', function(req, res) {
        console.log(req.method);
        console.log(req.url);
        console.log(req.data);
        res.send('POST');
        // collection.insert()
    });
});

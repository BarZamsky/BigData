// insert invoices to mongo

const MongoClient = require('mongodb').MongoClient,
  assert = require('assert'),
  fs = require('fs')

const dbUrl = 'mongodb://127.0.0.1:27017/BigData';
const dbCollection = "BigData";

MongoClient.connect(dbUrl, { useNewUrlParser: true }, function(err, client) {
  assert.equal(null, err);
  console.log("Connected to BigData db..");
  const db = client.db(dbCollection);

  fs.readdir('invoices', (err, files) => {
    files.forEach(file => {
      fs.readFile("invoices/" + file, function(err, data) {
        db.collection("Invoices").insertOne(
          JSON.parse(data),
          function(err, result) {
            assert.equal(err, null);
          });
      });
    });
  });
});

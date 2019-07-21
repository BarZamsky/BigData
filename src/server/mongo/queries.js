const MongoClient = require('mongodb').MongoClient,
assert = require('assert');


const dbUrl = 'mongodb://127.0.0.1:27017/';

let db;

const vendors = ["Rami Levy - Hashikma Marketing", "Mega", "Shufersal", "Hazi-Hinam", "Osher ad",
          "Victory", "Tiv-Taam", "AM:PM"];

function getVolume(productName, start, end, callBack) {
  MongoClient.connect(dbUrl, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    db = client.db("BigData");

  let vendorProductCount = [];
    let res = db.collection("vendors").find({
      invoices: {
          $elemMatch: {
            date: {$gte: new Date(start).toISOString(),
                  $lt: new Date(end).toISOString()}}},
    }).toArray(function(err, result) {
        if (err) throw err;

        for (res of result) {
          let elem = {
            vendor: res["provider"],
            volume: 0
          }
          for (invoice of res["invoices"]) {
            for (item of invoice["items"]) {
              if (item.id == productName) {
                elem['volume']++;
              }
            }
          }
          vendorProductCount.push(elem)
        }
        for (const vendor of vendors) {
          if (!vendorProductCount.some(item => item.vendor === vendor)) {
            let newVendor = {
              vendor: vendor,
              volume: 0
            }
            vendorProductCount.push(newVendor);
          }
        }
        return callBack(vendorProductCount);
      });
    });
}

  function getPriceChange(productName, start, end, callBack) {
    MongoClient.connect(dbUrl, { useNewUrlParser: true }, function(err, client) {
      assert.equal(null, err);
      console.log("Connected correctly to server");
      db = client.db("BigData");

    let productPrices = [];
      let res = db.collection("vendors").find({
        invoices: {
            $elemMatch: {
              date: {$gte: new Date(start).toISOString(),
                    $lt: new Date(end).toISOString()}}},
      }).toArray(function(err, result) {
          if (err) throw err;

          for (res of result) {
            let elem = {
              vendor: res["provider"],
              prices: 0
            }
            for (invoice of res["invoices"]) {
              for (item of invoice["items"]) {
                if (item.id == productName) {
                  elem['prices'] = item.price;
                }
              }
            }
            productPrices.push(elem)
          }
          for (const vendor of vendors) {
            if (!productPrices.some(item => item.vendor === vendor)) {
              let newVendor = {
                vendor: vendor,
                prices: 0
              }
              productPrices.push(newVendor);
            }
          }
          return callBack(productPrices);
        });
      });
  }

module.exports = {getVolume, getPriceChange};

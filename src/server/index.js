const express = require('express'),
 bodyParser = require('body-parser'),
 os = require('os'),
 path = require('path')
 cors = require('cors'),
 fileUpload = require('express-fileupload'),
 {uploadToHdfs, uploadToMongo, sendToKafka} = require('./utils/functions'),
 {mongoVendorCollection} = require('./mongo/mongo'),
 {getVolume, getPriceChange, getVendorsData} = require('./mongo/queries')

 const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('dist'));
app.use(fileUpload())

app.post('/upload', (req, res, next) => {
  let uploadFile = req.files.file
  const fileName = req.files.file.name
  uploadFile.mv(
    `${__dirname}/public/files/${fileName}`, function (err) {
      if (err) {
        res.status(200).send("error occoured!")
      } else {
        try {
          sendToKafka(fileName)
          uploadToHdfs(uploadFile.data, fileName);
          uploadToMongo(fileName);
          mongoVendorCollection(fileName);
          next();
        } catch(e) {
          console.log(e);
        }
      }});
  });

  app.get('/best-seller', (req, res) => {
    res.send('test')
  })

  app.post('/product-volume', async (req, res) => {
    if (!req['body']) {
      res.send("no body")
    }
    console.log(req.body);
    let productName = req.body['productName'];
    let start = req.body['start'];
    let end = req.body['end'];

    getVolume(productName, start, end, function(result) {
      res.status(200).send(result);
    });
  })

  app.post('/product-price', async (req, res) => {
    if (!req['body']) {
      res.send("no body")
    }
    console.log(req.body);
    let productName = req.body['productName'];
    let start = req.body['start'];
    let end = req.body['end'];

    getPriceChange(productName, start, end, function(result) {
      res.status(200).send(result);
    });
  })

  app.get('/vendors', async (req, res) => {
    getVendorsData(function(result) {
      res.status(200).send(result);
    });
  })

app.listen(process.env.PORT || 8080, () => console.log(`server running on port ${process.env.PORT || 8080}!`));
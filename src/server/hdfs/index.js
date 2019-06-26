const express = require('express'),
  WebHDFS = require("webhdfs"),
  hdfs = require('./webhdfs-client');

const app = express();

const port = 50070;
// Include fs module for local file system operations
var fs = require('fs');

// Initialize readable stream from local file
// Change this to real path in your file system
var localFileStream = fs.createReadStream('C:/Users/barza/Desktop/BigData/invoices/invoice1.json');

// Initialize writable stream to HDFS target
var remoteFileStream = hdfs.createWriteStream('/usr/local/hadoop/etc/hadoop');

// Pipe data to HDFS
localFileStream.pipe(remoteFileStream);

// Handle errors
remoteFileStream.on('error', function onError (err) {
  // Do something with the error
});

// Handle finish event
remoteFileStream.on('finish', function onFinish () {
  console.log("done");
});

// Variable for storing data
var data = new Buffer();

remoteFileStream.on('error', function onError (err) {
  // Do something with the error
});

remoteFileStream.on('data', function onChunk (chunk) {
  // Concat received data chunk
  data = Buffer.concat([ data, chunk ]);
});

remoteFileStream.on('finish', function onFinish () {
  // Upload is done
  // Print received data
  console.log(data.toString());
});

app.listen(port, () => console.log(`listening on port ${port}!`))

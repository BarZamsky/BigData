const express = require('express'),
  fs = require('fs'),
  hdfs = require('./webhdfs-client');

  fs.readdir('invoices', (err, files) => {
    files.forEach(file => {
      let localFileStream = fs.createReadStream('invoices/'+file);
      // Initialize writable stream to HDFS target
      let remoteFileStream = hdfs.createWriteStream('/hadoop/dfs/name');
      // Pipe data to HDFS
      localFileStream.pipe(remoteFileStream);
      // Handle errors
      remoteFileStream.on('error', function onError (err) {
        // Do something with the error
      });
      // Handle finish event
      remoteFileStream.on('finish', function onFinish () {
        console.log("upload file");
      });
    });
  });

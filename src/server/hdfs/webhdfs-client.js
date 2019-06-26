const WebHDFS = require('webhdfs');

// Create a new hdfs client
let hdfs = WebHDFS.createClient({
  user: 'root',
  host: 'localhost',
  port: 50070
});

module.exports = hdfs;

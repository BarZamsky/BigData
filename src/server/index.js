const express = require('express'),
 os = require('os'),
 path = require('path')
 cors = require('cors'),
 upload = require('./upload'),
 fileUpload = require('express-fileupload')

const app = express();

app.use(cors())
app.use(express.static('dist'));
app.use(fileUpload())

app.post('/upload', (req, res, next) => {
  let uploadFile = req.files.file
  const fileName = req.files.file.name
  uploadFile.mv(
    `${__dirname}/public/files/${fileName}`,
    function (err) {
      if (err) {
        return res.status(500).send(err)
      }
      res.json({
        file: `public/${req.files.file.name}`,
      })
    },
  )
})

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

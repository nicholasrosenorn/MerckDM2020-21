var aws = require('aws-sdk')
var express = require('express')
var multer = require('multer')
var multerS3 = require('multer-s3')

aws.config.update({
    secretAccessKey: 'PUTYOURDATAHERE',
    accessKeyId: 'PUTYOURDATAHERE',
    region: 'PUTYOURDATAHERE'
});

var app = express();
var s3 = new aws.S3();
 
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'PUTYOURDATAHERE',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'Testing File'});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload;
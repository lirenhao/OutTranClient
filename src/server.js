var express = require('express');
var bodyParser = require('body-parser');
var sign = require('./sign');

var app = express();
var jsonParser = bodyParser.json()

app.post('/', jsonParser, function (req, res) {
  console.log(JSON.stringify(req.body));
  var resData = {
    msgInfo: req.body.msgInfo,
    certificateSignature: {
      signature: "00000000"
    }
  }
  const signature = sign.sign(JSON.stringify(resData));
  resData.certificateSignature.signature = signature;
  res.send(JSON.stringify(resData));
});

app.listen(3000);

// init project
var express = require('express');
var app = express();

// must enable to see client ip when app running behind proxy
app.enable('trust proxy');

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  
  var ip = req.ip;
  // accept ipV6 and ipV4 ips
  if (ip.slice(0, 7) === '::ffff:') {
    ip = ip.slice(7);
  }
  
  var lang = req.get('Accept-Language');
  // return first language accepted
  var commaIndex = lang.indexOf(',');
  if (commaIndex > 0) {
    lang = lang.slice(0, commaIndex);
  }
  // expression to capture content between first set of brackets
  var regex = /(?<=\()[^\)]*(?=\))/;
  var agentArr = regex.exec(req.get('User-Agent'));
  if (agentArr.length) {
    var os = agentArr[0];
  } else {
    var os = req.get('User-Agent');
  }
  
  // object to return
  var resObj = {ipaddress: ip, language: lang, system: os};
  
  res.send(JSON.stringify(resObj));
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

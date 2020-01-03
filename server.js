var connect = require('connect');
var https = require('http');
var serveStatic = require('serve-static');
var crypto = require('crypto');
var  fs = require("fs");
var app = connect();
var port = 8000;
app.use( serveStatic("./build"));
var options = {
    //key: fs.readFileSync('./cert/myserver.key'),
   // cert: fs.readFileSync('./cert/myserver.crt'),
    requestCert: false,
    rejectUnauthorized: false
};

console.log("Serving ./build content on port " + port +". Go to https://localhost:" + port);
//app.listen(port);

https.createServer(options, app).listen(port);

var connect = require('connect');
var https = require('https');
var serveStatic = require('serve-static');
var crypto = require('crypto');
var  fs = require("fs");
var app = connect();
var port = 8000;
app.use( serveStatic("./build"));
var options = {
    key: fs.readFileSync('./cert/server.key'),
    cert: fs.readFileSync('./cert/server.crt'),
    requestCert: false,
    rejectUnauthorized: false
};

console.log("Serving ./build content on port " + port +". Go to http://localhost:" + port);
//app.listen(port);

https.createServer(options, app).listen(port);

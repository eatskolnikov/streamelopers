var connect = require('connect');
var serveStatic = require('serve-static');
var app = connect();
var port = 8000;
app.use( serveStatic("./build"));
console.log("Serving ./build content on port " + port +". Go to http://localhost:" + port);
app.listen(port);

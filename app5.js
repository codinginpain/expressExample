var express = require(`express`);
var http = require(`http`);

var app = express();

app.set(`port`, process.env.PORT || 3000);

app.use(function(req, res, next) {
    console.log(`first middleware called`);

    res.redirect(`http://google.co.kr`);
});

var server = http.createServer(app).listen(app.get(`port`), function() {
    console.log(`server5 starts with express : ${app.get(`port`)}`);
});
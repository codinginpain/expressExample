var express = require(`express`);
var http = require(`http`);

var app = express();

app.set(`port`, process.env.PORT || 3000);

app.use(function(req, res, next) {
   console.log(`first middleware called`);

   var userAgent = req.header(`User-Agent`);
   var paramName = req.query.name; 

   res.send(`<h3>respon from server. User-Agent: ${userAgent}</h3><h3>Param Name -> ${paramName}</h3>`);
});

var server = http.createServer(app).listen(app.get(`port`), function() {
    console.log(`server6 starts with express : ${app.get(`port`)}`);
});


//query : get방식 parameter 확인가능
// body : post방식 parameter 확인
// header(name) : 헤더 확인 (user-agent);
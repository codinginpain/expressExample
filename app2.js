var express = require(`express`);
var http = require(`http`);

var app = express();

app.set(`port`, process.env.PORT || 3000);

app.use(function(req, res, next) {
    console.log(`첫번째 미들웨어 호출 됨.`);

    res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
    res.end("<h1>서버에서 응답한 결과 입니다</h1>");
});

var server = http.createServer(app).listen(app.get(`port`), function() {
    console.log(`start server2 by express : ${app.get(`port`)}`);
})
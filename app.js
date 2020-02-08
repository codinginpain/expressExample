var express = require(`express`); //외장 모듈이므로 설치해야함
var http = require(`http`);

var app = express(); //express server 객체 설치해야함

app.set(`port`, process.env.PORT || 3000); //port 설정 PORT 없으면 3000

var server = http.createServer(app).listen(app.get(`port`), function() {
    console.log(`web server start by express : ${app.get(`port`)}`);
});


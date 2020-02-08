var express = require(`express`);
var http = require(`http`);

var app = express();

app.set(`port`, process.env.PORT || 3000);

app.use(function(req, res, next) {
    console.log(`first middleware called`);

    req.user = `kee`;
    next();
});

app.use(function(req, res, next) {
    console.log(`second middleware called`);

    // res.writeHead(200, {"Content-Type":"text/html;charse=utf8"});
    //res.send(`<h1>result from server : ${req.user}</h1>`); //send로 writeHead와 end 둘다를 한번에 처리 가능

    var person = {name :`소녀시대`, age:`20`}; //객체를 넘길 수도 있음 
    // res.send(person); //json 객체를 자동으로 자바스크립트가 문자열로 변환해서 보내지만

    var personStr = JSON.stringify(person); //명시적으로 해주면 더 안전
    // res.send(personStr);

    res.writeHead(200, {"Content-Type":"application/json;charset=utf8"});
    res.write(personStr);
    res.end();
});

var server = http.createServer(app).listen(app.get(`port`), function() {
    console.log(`start server4 by express : ${app.get(`port`)}`);
});
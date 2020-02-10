var express = require(`express`);
var http = require(`http`);
var static = require(`serve-static`);
var path = require(`path`);

var bodyParser = require(`body-parser`);

var app = express();

app.set(`port`, process.env.PORT || 3000);
app.use(static(path.join(__dirname, `public`)));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var router = express.Router(); //router

router.route(`/process/login`).post((req, res) => {
    console.log(`/process/login routing Fn`);

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password;

    res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
    res.write(`<h1>login response from server</h1>`);
    res.write(`<div><p>${paramId}</p></div>`);
    res.write(`<div><p>${paramPassword}</p></div>`);
    res.end();
});

app.use(`/`, router); //미들웨어 (라우팅이 다 끝나고나면 사용);?


var server = http.createServer(app).listen(app.get(`port`), () => {
    console.log(`server9 starts with express : ${app.get(`port`)}`);
})

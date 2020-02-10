var express = require(`express`);
var http = require(`http`);
var static = require(`serve-static`);
var path = require(`path`);

var bodyParser = require(`body-parser`);

var app= express();

app.set(`port`, process.env.PORT || 3000);
app.use(static(path.join(__dirname, `public`)));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var router = express.Router();

router.route(`/process/login/:name`).post((req, res) => {
    console.log(`/process/login/:name routing Fn`);

    var paramName = req.params.name;  //url parameter로 받으면 req.params 안에 들어옴 요청 path에 param을 붙여서오면 기능을 표기해서 더욱 명확하게 기능을 표기 할 수 있어서 자주 사용됨

    var paramId = req.body.id;
    var paramPassword = req.body.password;

    res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
    res.write(`<h1>login response from server</h1>`);
    res.write(`<div><p>${paramName}</p></div>`);
    res.write(`<div><p>${paramId}</p></div>`);
    res.write(`<div><p>${paramPassword}</p></div`);
});

app.all(`*`, (req, res)=>{
    res.status(404).send(`<h1>요청하신 페이지는 없습니다.</h1>`);
})

app.use(`/`, router);

var server = http.createServer(app).listen(app.get(`port`), () => {
    console.log(`server10 starts with express : ${app.get(`port`)}`);
});
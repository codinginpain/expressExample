var express = require(`express`);
var http = require(`http`);
var static = require(`serve-static`);
var path = require(`path`);

var app = express();

app.set(`port`, process.env.PORT || 3000);

// app.use(); //미들웨어 등록  static 모듈을 이용해 폴더를 오픈해 놓음(접근가능)
app.use(static(path.join(__dirname, `public`))); // path모듈에 .join해서 상위폴더와 하위폴더 경로를 이어줌 __dirname 현재 실행되는 폴더 + public -> 효과는  ./현재경로/public 까지 입력한걸로 치므로 생략하고 다음경로쓰면됨
// app.use(`/public`, static(path.join(__dirname, `public`))); 이렇게하면 public을 명시 해주어야함 / 위처럼 빼주는게 더 좋다

app.use(function(req, res, next) {
    console.log(`first middleware called`);

    var userAgent = req.header("User-Agent");
    var paramName = req.query.name;

    res.send(`<h3>response from server User-Agent -> ${userAgent}</h3><h3>ParamName -> ${paramName}</h3>`)
});


var server = http.createServer(app).listen(app.get(`port`), function() {
    console.log(`server7 starts with express : ${app.get(`port`)}`);
});


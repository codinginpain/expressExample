var express = require(`express`);
var http = require(`http`);
var static = require(`serve-static`);
var path = require(`path`);

var bodyParser = require(`body-parser`);

var app = express();

app.set(`port`, process.env.PORT || 3000);
// app.use(); //미들웨어 등록
app.use(static(path.join(__dirname, `public`))); // path모듈에 .join해서 상위폴더와 하위폴더 경로를 이어줌 __dirname 현재 실행되는 폴더 + public 
// app.use(`/public`, static(path.join(__dirname, `public`))); //이렇게하면 public을 명시 해주어야함 / 위처럼 빼주는게 더 좋다

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`first middleware called`);

    var userAgent = req.header("User-Agent");
    var paramId = req.body.id || req.query.id; //post or get -> from 태그안에 input 의 name="id" 값에 저장 된 값으로 땀

    res.send(`<h3>respon from server User-Agent -> ${userAgent}</h3><h3>ParamName -> ${paramId}</h3>`)
});


var server = http.createServer(app).listen(app.get(`port`), function() {
    console.log(`server7 starts with express : ${app.get(`port`)}`);
});

//포스트맨을 사용해서 parameter를 넘겨 보았음

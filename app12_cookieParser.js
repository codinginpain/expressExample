//npm install cookie-parser --save

var express = require(`express`);
var http = require(`http`);
var static = require(`serve-static`);
var path = require(`path`);
var expressErrorHandler = require(`express-error-handler`);

var bodyParser = require(`body-parser`);
var cookieParser = require(`cookie-parser`);
var errorHandler = expressErrorHandler({
    static:{
        "404" : "./public/404.html"
    }
})

var app = express();

app.set(`port`, process.env.PORT || 3000);
app.use(`/public`, static(path.join(__dirname, `public`)));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser());

var router = express.Router();

router.route(`/process/setUserCookie`).get((req, res) => {  //경로 요청시 쿠키저장
    console.log(`/process/setUserCookie routing fn called`);
    res.cookie(`user`, {            //cookieParser 외장 모듈이 있으면 res 객체 안에 cookie 사용가능
        id:"mike",
        name:"소녀시대",
        authorized:true
    });
    
    res.redirect(`/process/showCookie`);
});

router.route(`/process/showCookie`).get((req, res) => {
    console.log(`/process/showCookie routing fn called`);

    res.send(req.cookies);
});


app.use(`/`, router);

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

var server = http.createServer(app).listen(app.get(`port`), () => {
    console.log(`server11 starts with express : ${app.get(`port`)}`);
})
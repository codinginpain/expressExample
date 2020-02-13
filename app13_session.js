//npm install express-session --save


var express = require(`express`);
var http = require(`http`);
var static = require(`serve-static`);
var path = require(`path`);
var expressErrorHandler = require(`express-error-handler`);

var bodyParser = require(`body-parser`);
var cookieParser = require(`cookie-parser`);
var expressSession = require(`express-session`);


var errorHandler = expressErrorHandler({
    static : {
        '404' : './public/404.html'
    }
});

var app = express();

app.set(`port`, process.env.PORT || 3000);
app.use(static(path.join(__dirname, `public`)));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(expressSession({ //세션에 대한 설정 정보
    secret:"my key",
    resave:true,
    saveUninitialized:true
}));

var router = express.Router();

router.route(`/product`).get((req, res) => {
    console.log(`/product routing fn called`);

    if(req.session.user) {
        console.log("세션 있음");
        res.redirect(`/product.html`);
    }else {
        console.log("세션 없음");
        res.redirect(`/login2.html`);
    }
});

router.route(`/login`).post((req, res) => {
    console.log(`login routing fn called`);

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password;
    console.log(`parameter : ${paramId} , ${paramPassword}`);

    if(req.session.user) {
        console.log('이미 로그인 되어 있습니다');
        res.redirect(`/product.html`);
    }else {
        req.session.user = {
            id:paramId,
            name:`소녀시대`,
            authorized:true
        };

        res.writeHead(200, {"Content-Type":"text/html;charset=utf8"});
        res.write(`<h1>로그인 성공</h1>`);
        res.write(`<p>id : ${paramId}</p>`);
        res.write(`<br><br><a href="/product">상품 페이지로 이동하기</a>`);
        res.end();
    }
});

router.route(`/logout`).get((req, res) => {
    console.log(`/logout routing fn called`);

    if(req.session.user) {
        console.log(`로그아웃 합니다.`);
        req.session.destroy((err) => {//세션정보 삭제
            if(err) {
                console.log(`세션 삭제에 실패하였습니다.`);
                return;
            }
            console.log(`세션 삭제 성공`);
            res.redirect(`/login2.html`);
        }); 
    }else {
        console.log(`로그인 되어있지 않습니다.`);
        res.redirect(`login2.html`);
    }
});

router.route(`/setUserCookie`).post((req, res) => {
    console.log(`setUserCookie routing fn called`);

    res.cookie(`user`, {
        id : "mike",
        name : "소녀시대",
        authorized:ture
    });

    res.redirect(`showCookie`);
});

router.route(`showCookie`).get((req, res) => {
    console.log(`showCooke routing fn called`);

    res.send(req.cookies);
})

app.use(`/`, router);

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

var server = http.createServer(app).listen(app.get(`port`), () => {
    console.log(`server11 starts with express : ${app.get(`port`)}`);
});


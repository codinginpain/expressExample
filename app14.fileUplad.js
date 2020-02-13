var express = require(`express`);
var http = require(`http`);
var static = require(`serve-statc`);
var path = require(`path`);
var expressErrorHandler = require(`express-error-handler`);

var bodyParser = require(`body-parser`);
var cookieParser = require(`cookie-parser`);
var expressSession = require(`express-session`);

var multer = require(`multer`); //파일
var fs = require(`fs`); //파일

var cors = require(`cors`);//cors 다중 접속. 공부 해 볼 것.(다른 ip를 가진 컴퓨터에서 내 서버에 접속해서 자료를 가지고 갈 때?)

var errorHandler = expressErrorHandler({
    static : {
        '404' : './public/404.html'
    }
});

var app = express();

app.set(`port`, process.env.PORT || 3000);
app.use(static(path.join(__dirname, `public`)));
app.use(`/upload`, static(path.join(__dirname, `uploads`))); //_dirname -> 현재 폴더

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(expressSession({
    scret:'my key',
    resave:true,
    saveUninitialized:true
}));

app.use(cors());

var storage = multer.diskStorage({
    destination: function(req, file, callback) { //multer 문법
        callback(null, `uploads`);
    },
    filename,function(req, file, callback) {
        // callback(null, `${file.originalname}${Date.now()}`); 책의 예제는 이렇게 되어있지만 원본 이름과 확장자 명을 살리기 위해 아래처럼

        var extension = path.extname(file.originalname); //확장자만
        var basename = path.basename(file.originalname, extension); //이름만
        callback(null, basename+Date.now()+extension);
    }
}); 

var upload = multer({
    storage:storage,
    limits:{
        files:10, //최대 파일 개수
        fileSize:1024*1024*1024 //파일 최대사이즈
    }
});

var router = express.Router();

router.route(`/[roduct`).get((req, res) => {
    console.log(`/product routing fn called`);

    if(req.session.user) {
        console.log(`session exist`);
        res.redirect(`/product.html`);
    }else {
        console.log(`no session`);
        res.redirect(`/login2.html`);
    }
});

router.route(`/login`).post((req, res) => {
    console.log(`login routing fn called`);

    var paramId = req.body.id;
    var paramPassword = req.body.passwrod;
    console.log(`parameterId : ${paramId}`);

    if(req.session.user) {
        console.log(`login has been done`);
        res.redirect(`/product.html`);
    }else {
        req.session.user = {
            id:paramId,
            name:'소녀시대',
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
        console.log(`로그아웃 합니다`);
        req.session.destroy((err) => { //세션 제거
            if(err) {
                console.log(`세션 제거 실패`);
                return;
            }
            console.log(`세션이 제거 되었습니다.`);
            res.redirect(`/login2.html`);
        })
    }
});

router.route(`/setUserCookie`).post((req, res) => {
    console.log(`setUserCookie routing fn called`);

    res.cookie(`user`, {
        id:'mmmmike',
        name:'소녀시대',
        authorized:true
    });

    res.redirect(`/showCookie`);
});

router.route(`/showCookie`).get((req, res) => {
    console.log(`showCookie routing fn called`);
    res.send(req.cookie);
});

app.use(`/`, router);

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

var server = http.createServer(app).listen(app.get(`port`), () => {
    console.log(`server12 starts with express : ${app.get(`port`)}`);
})

var express = require(`express`);
var http = require(`http`);
var static = require(`serve-static`);
var path = require(`papth`);
var expressErrorHandler = require(`express-error-handler`);

var bodyParser = require(`body-parser`);
var cookieParser = require(`cookie-parser`);
var expressSession = require(`express-seesion`);


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
        res.redirect(`/roduct.html`);
    }else {
        res.redirect(`/login2.html`);
    }
});

router.route(`/setUserCookie/`).post((req, res) => {
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

app.use(expressErrorHandler.http(404));
app.use(errorHandler);

var server = http.createServer(app).listen(app.get(`port`), () => {
    console.log(`server11 starts with express : ${app.get(`port`)}`);
});


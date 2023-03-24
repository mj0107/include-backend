const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('./passport/index');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const MySQLStore = require('express-mysql-session')(session);

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let options = {
    host: process.env.host,
    port: '3306',
    user: process.env.user,
    password: process.env.password,
    database: 'include',
};

let sessionStore = new MySQLStore(options);

app.use(session({
    secret : process.env.secret,
    resave : false,
    saveUninitialized : false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60
    },
    store : sessionStore
}));

app.use(passport.initialize());
app.use(passport.session());
passportConfig();

app.use(cookieParser(process.env.secret));

app.set('port', process.env.PORT || 8080);

//html
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine','ejs');
// app.engine('html', require('ejs').__express);

//react
let cors = require('cors');
app.use(cors({ origin: true, credentials: true }))
app.use(express.static(path.join(__dirname, 'build')));

//html
// const memberBoardRouter = require('./router/memberRegister_html');
// const activityBoardRouter= require('./router/activity_html');
// const mainRouter = require('./router/home_html');

// react
const memberBoardRouter = require('./router/memberRegister_react');
const activityBoardRouter = require('./router/activity_react');
const loginRouter = require('./router/login');
const logoutRouter = require('./router/logout');
const signupRouter = require('./router/signup');

app.use(methodOverride('_method'));

app.use(flash());
app.use('/public',express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:8080")
// })

app.use('/', mainRouter);
app.use('/member', memberBoardRouter);
app.use('/activity', activityBoardRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

app.listen(app.get('port'), (req, res) => {
    console.log(app.get('port'), "빈 포트에서 대기");
});
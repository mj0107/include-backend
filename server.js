const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const passportConfig = require('./auth/localStrategy');
const methodOverride = require('method-override');
require('dotenv').config();

const app = express();
app.use(methodOverride('_method'));

//얘 뭐임?
//const logger = require('morgan');
let session = require('express-session');
let SQLStore = require('express-mysql-session')(session);

let options = {
    host: process.env.host,
    port: '3306',
    user: process.env.user,
    password: process.env.password,
    database: 'include'
};

let sessionStore = new SQLStore(options);


app.use('/public',express.static(path.join(__dirname, 'public')));

//html
//const memberBoardRouter = require('./router/memberRegister_html');
//const activityBoardRouter= require('./router/activity_html');
// react
const memberBoardRouter = require('./router/memberRegister_react');
const activityBoardRouter = require('./router/activity_react');
const signinRouter = require('./router/signin');
const signupRouter = require('./router/signup');

app.set('port', process.env.PORT || 8080);

app.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080")
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret:process.env.secret,
    resave : false,
    saveUninitialized : true,
    store : sessionStore
}))

app.use(passport.initialize());
app.use(passport.session());
passportConfig();

//html
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine','ejs');
// app.engine('html', require('ejs').__express);

//react
let cors = require('cors');
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

app.use('/member', memberBoardRouter);
app.use('/activity', activityBoardRouter);
app.use('/signup', signupRouter);
app.use('/', signinRouter);

app.listen(app.get('port'), (req, res) => {
    console.log(app.get('port'), "빈 포트에서 대기");
});
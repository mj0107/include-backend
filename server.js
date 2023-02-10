const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const app = express();

app.use('/img',express.static(path.join(__dirname, 'public')));

const memberBoardRouter = require('./router/memberRegister');
const activityBoardRouter= require('./router/activity');


app.set('port', process.env.PORT || 8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// //html
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine','ejs');
// app.engine('html', require('ejs').__express);
// app.use('/public', express.static(path.join(__dirname, 'public')));

// react
var cors = require('cors');
app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.use('/member', memberBoardRouter);
app.use('/activity', activityBoardRouter);

app.get('/', (req, res) => {
    res.render('home.html');
})

app.listen(app.get('port'), (req, res) => {
    console.log(app.get('port'), "빈 포트에서 대기");
});
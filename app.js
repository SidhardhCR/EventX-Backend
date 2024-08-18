var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userapiRouter = require('./routes/apis/user');
var db = require('./config/db_connection');
var collections = require('./config/db_collections');
const cors = require('cors');
const fileUpload = require('express-fileupload')
require('dotenv').config();
const clientid = process.env.clientid;
const clientsecret = process.env.clientsecret;

const session = require('express-session');
const passport = require('passport');
const OAuth2Stratergy = require('passport-google-oauth2').Strategy

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: "http://localhost:5173",
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: "eventx526626klmn",
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Stratergy({
    clientID: clientid,
    clientSecret: clientsecret,
    callbackURL: '/auth/google/callback',
    scope: ['profile', 'email']
  },
    async (accessToken, refreshToken, profile, done) => {
      console.log("profile", profile)
      try {
        let user = await db.get().collection(collections.Collection_User).findOne({ googleId: profile.id });

        if (!user) {
          let user = {
            googleId: profile.id,
            displayName: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value
          }
          db.get().collection(collections.Collection_User).insertOne(user).then((response) => {
            console.log(response)
          })
          return done(null, user)
        } else {
          return done(null, user)
        }
      } catch (err) {
        return done(err, null)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user);
})

passport.deserializeUser((user, done) => {
  done(null, user);
})

db.connect((err) => {
  if (err) {
    console.log("Database connection Error")
  }
  else {
    console.log("Database Connected successfully")
  }
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', userapiRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var express = require('express');
var router = express.Router();
var passport = require('passport')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sample', (req, res) => {
  res.json('hi')
});

router.get('/auth/google', passport.authenticate("google", { scope: ["profile", "email"] }));

router.get('/auth/google/callback', passport.authenticate("google", {
  successRedirect: 'https://event-x-frontend.vercel.app',
  failureRedirect: 'https://event-x-frontend.vercel.app/login'
}));

router.get('/login/success', async (req, res) => {
  console.log(req.user)
  console.log('login success', req.user)
  if (req.user) {
    res.status(200).json({ messag: 'user login', user: req.user })
  } else {
    res.status(400).json({ message: 'Nopt authorized' })
  }

})

module.exports = router;

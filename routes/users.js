var express = require('express');
const passport = require('passport');
var router = express.Router();
const LocalStrategy = require('passport-local').Strategy;
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res) => {
  console.log(req.body)

  const { displayName, email, password } = req.body;

 
  passport.use(new LocalStrategy(
    (done) => {
      user = {
        displayName: displayName,
        email: email,
        password: password, // Note: In a real app, ensure you hash passwords
      };
      if (user) {
       
      return done(null, user);
    }
  }
  ));
  
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((id, done) => {
   
    done(null, user);
  });

  
  res.status(200).json({ message: true })
})


module.exports = router;

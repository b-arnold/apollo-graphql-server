const router = require('express').Router();
const passport = require('passport');
const passportService = require('../services/passport');
const secured = require('../services/secured');



// perform the signin, after signin Auth0 will redirect to callback
router.get('/login', passport.authenticate('auth0', {
    responseType: 'code',
    scope: 'openid email profile'
  }), function (req, res) {
    res.redirect('/');
  })

router.get('/callback', function (req, res, next) {
    passport.authenticate('auth0', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            const returnTo = req.session.returnTo;
            delete req.session.returnTo;
            res.redirect(returnTo || '/graphql');
        });
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

module.exports = router;
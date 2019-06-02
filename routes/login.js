var express = require('express');
var router = express.Router();
var { mongoose } = require('./../db_modules/mongoose');
var { user } = require('./../db_modules/db_models/user');
var { post } = require('./../db_modules/db_models/post');

router.get('/', (req, res) => {
    res.render('login.hbs');
});

router.post('/', (req, res) => {

    // validation of form
    req.check('username', 'Minimum length of username should be 4').isLength({ min: 4 });
    req.check('password', 'Minimum length of username should be 4').isLength({ min: 4 });

    // gettting any errors
    var errors = req.validationErrors();

    if (errors) {
        res.redirect('/login?password_format=invalid&username_format=invalid');
    } else {
        user.findOne({
            username: req.body.username,
            password: req.body.password
        }).then((user) => {
            if (!user) {
                res.redirect('login?login_failed_username_or_password_incorrect');
            } else {
                req.session.email = user.email;
                req.session.profilepic = user.profilepic;
                req.session.username = user.username;
                req.session.profilelink = user.profilelink
                res.redirect('wall');
            }
        });
    }
});

module.exports = router;
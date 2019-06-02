var express = require('express');
var router = express.Router();
var { upload } = require('./../upload_modules/multer');
var { mongoose } = require('./../db_modules/mongoose');
var { user } = require('./../db_modules/db_models/user');

router.get('/', (req, res) => {
    res.render('signup.hbs');
});

router.post('/', upload.single('profilepic'), (req, res) => {

    // validation of form
    req.check('username', 'Minimum username length should be 4').isLength({ min: 4 });
    req.check('email', 'Invalid email address format').isEmail();
    req.check('password', 'Minimum password length should be 4').isLength({ min: 4 });

    var errors = req.validationErrors();

    if (errors) {
        res.redirect('/signup?email_format=invalid&password_format=invalid&username_format=invalid');
    } else {
        // making new user object according to user model
        var newUser = new user({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            profilepic: req.file.filename,
            profilelink: req.body.username
        });

        // saving data in database
        newUser.save().then((doc) => {
            user.findOne({
                username: req.body.username,
                password: req.body.password
            }).then((user) => {
                req.session.email = user.email;
                req.session.profilepic = user.profilepic;
                req.session.username = user.username;
                req.session.profilelink = user.profilelink
                res.redirect('wall');
            });
        }, (e) => {
            console.log('Unable to signup');
        });
    }
});

module.exports = router;
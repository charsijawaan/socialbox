var express = require('express');
var router = express.Router();
var { upload } = require('./../upload_modules/multer');
var conn = require('./../db_modules/connection');

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
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var profilePic = req.file.filename;

        var sql = `INSERT INTO user (username, email, password, profilePic) VALUES (?,?,?,?)`;
        var data = [username, email, password, profilePic];
        conn.query(sql, data, (err, rows, fields) => {
            if (err)
                console.log('user not added');
            else {
                req.session.username = username;
                req.session.email = email;
                req.session.profilePic = profilePic;
                res.redirect('wall');
            }
        });

    }
});

module.exports = router;
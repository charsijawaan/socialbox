var express = require('express');
var router = express.Router();
var conn = require('./../db_modules/connection');

router.get('/', (req, res) => {
    res.render('login.hbs');
});

router.post('/', (req, res) => {

    var username = req.body.username;
    var password = req.body.password;

    // validation of form
    req.check('username', 'Minimum length of username should be 4').isLength({ min: 4 });
    req.check('password', 'Minimum length of username should be 4').isLength({ min: 4 });

    // gettting any errors
    var errors = req.validationErrors();

    if (errors) {
        res.redirect('/login?password_format=invalid&username_format=invalid');
    } else {
        var sql = `SELECT * FROM user WHERE username = ? AND password = ? LIMIT 1`;
        var data = [username, password];
        conn.query(sql, data, (err, rows, fields) => {
            if (rows.length > 0) {
                req.session.userID = rows[0].id;
                req.session.username = rows[0].username;
                req.session.email = rows[0].email;
                req.session.profilePic = rows[0].profilePic;
                res.redirect('wall');
            } else
                res.redirect('login?no_match_found');
        });
    }
});

module.exports = router;
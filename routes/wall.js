var express = require('express');
var router = express.Router();
var conn = require('./../db_modules/connection');

router.get('/', (req, res) => {
    console.log('This is wall');
    if (req.session.email) {
        var sql = `SELECT * FROM post WHERE sharedBy = ?`;
        conn.query(sql, [req.session.userID], (err, rows, fields) => {
            res.render('wall.hbs', {
                myID: req.session.userID,
                myUsername: req.session.username,
                myProfilePic: req.session.profilePic,
                posts: rows
            });
        });
    } else
        res.redirect('/login?session=expired');
});

router.post('/savepost', (req, res) => {
    if (req.session.email) {
        var sql = `INSERT INTO post (sharedBy, shareTime, likes, postText)
         VALUES (?, ?, ?, ?)`;
        var sharedBy = req.body.sharedBy;
        var shareTime = req.body.date;
        var likes = 0;
        var postText = req.body.post;

        var data = [sharedBy, shareTime, likes, postText];
        conn.query(sql, data, (err, rows, fields) => {
            if (err)
                console.log(err);
            else
                res.send('success');

        });

    }
});

module.exports = router;
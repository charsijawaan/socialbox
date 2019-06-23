var express = require('express');
var router = express.Router();
var conn = require('./../db_modules/connection');

router.get('/', (req, res) => {
    if (req.session.email) {
        let name = req.query.searchfield;
        if (name == '') {
            res.render('search.hbs', {
                users: null
            });
            return;
        } else {
            var sql = `SELECT * FROM user WHERE username LIKE ?`;
            conn.query(sql, name + '%', (err, rows, fields) => {
                res.render('search.hbs', {
                    users: rows
                });
            });
        }
    } else {
        res.redirect('/login?session=expired');
    }
});

router.post('/addfriend', (req, res) => {
    if (req.session.email) {
        var userIDOne = req.session.userID;
        console.log('XXX = ' + userIDOne);
        var friednID = req.body.friendID;
        var userIDTwo = friednID;
        var status;
        var sql = `SELECT * FROM friend WHERE userIDOne = ? AND userIDTwo = ?`;
        var data = [userIDOne, userIDTwo];
        conn.query(sql, data, (err, rows, fields) => {

            if (rows.length > 0) {
                res.send('alreadyfriends');
                return;
            }
        });

        sql = `INSERT INTO friend (userIDOne, userIDTwo, status) VALUES (?, ?, ?)`;

        status = 1;
        data = [userIDOne, userIDTwo, status];
        conn.query(sql, data, (err, rows, fields) => {
            if (err)
                console.log(err);
            else
                res.send('success');
        });

        sql = `INSERT INTO friend (userIDOne, userIDTwo, status) VALUES (?, ?, ?)`;

        status = 1;
        data = [userIDTwo, userIDOne, status];
        conn.query(sql, data, (err, rows, fields) => {
            if (err)
                console.log(err);
            else
                res.send('success');
        });
    } else {
        res.redirect('/login?session=expired');
    }
});

module.exports = router;
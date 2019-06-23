var express = require('express');
var router = express.Router();

router.get('/:username', (req, res) => {
    if (req.session.email) {
        var person = req.params.username;
        user.findOne({
            username: person
        }).then(user => {
            if (user) {
                res.render('user.hbs', {
                    // my data
                    myUsername: req.session.username,
                    myProfilepic: req.session.profilepic,
                    myProfilelink: req.session.profilelink,
                    myEmail: req.session.email,
                    // data of user that is opened
                    user: user
                });
            } else {

            }
        });

    } else {
        res.redirect('/login?session=expired');
    }
});

module.exports = router;
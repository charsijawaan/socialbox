var express = require('express');
var router = express.Router();
var { mongoose } = require('./../db_modules/mongoose');
var { post } = require('./../db_modules/db_models/post');

router.get('/', (req, res) => {
    if (req.session.email) {
        post.find({
            sharedby: req.session.username
        }).sort({ '_id': -1 }).exec((err, posts) => {
            res.render('wall', {
                myUsername: req.session.username,
                myProfilepic: req.session.profilepic,
                myProfilelink: req.session.profilelink,
                myEmail: req.session.email,
                myPosts: posts
            });
        });
    } else {
        res.redirect('/login?session=expired');
    }
});

router.post('/savepost', (req, res) => {
    if (req.session.email) {
        var newPost = new post({
            sharedby: req.session.username,
            sharetime: req.body.date,
            // postimage: String,
            likes: 0,
            posttext: req.body.post
        });

        newPost.save().then(doc => {
            res.send('success');
        });
    }
});

module.exports = router;
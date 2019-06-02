let mongoose = require('mongoose');

let post = mongoose.model('posts', {
    sharedby: String,
    sharetime: String,
    postimage: String,
    likes: String,
    posttext: String
});

module.exports = { post };
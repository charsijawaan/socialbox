let mongoose = require('mongoose');

let user = mongoose.model('userDetails', {
    username: String,
    email: String,
    password: String,
    profilepic: String,
    profilelink: String
});

module.exports = { user };
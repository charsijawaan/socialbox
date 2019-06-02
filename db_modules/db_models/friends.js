let mongoose = require('mongoose');

let friend = mongoose.model('listOfFriends', {
    user1: String,
    user2: String,
    status: String
});

module.exports = { friend };
let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://socialbox:Createyour1@cluster0-pw7nl.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true });
// mongoose.connect('mongodb://localhost:27017/socialbox', { useNewUrlParser: true });

module.exports = { mongoose };
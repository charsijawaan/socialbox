let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://socialbox:Createyour1@cluster0-pw7nl.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true }).then(() => {
    console.log("Connected to Database");
});
// mongoose.connect('mongodb://localhost:27017/socialbox', { useNewUrlParser: true }).then(() => {
//     console.log('Connected to Database');
// });

module.exports = { mongoose };
let mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://socialbox:<password>@cluster0-shard-00-00-pw7nl.mongodb.net:27017,cluster0-shard-00-01-pw7nl.mongodb.net:27017,cluster0-shard-00-02-pw7nl.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority", { useNewUrlParser: true });
// mongoose.connect('mongodb://localhost:27017/socialbox', { useNewUrlParser: true });

module.exports = { mongoose };
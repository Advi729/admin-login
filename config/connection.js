const MongoClient = require('mongodb').MongoClient;
const state = {
    db:null 
}
module.exports.connect = function(done) {
    // const url = 'mongodb://localhost:27017';
    const url = "mongodb://0.0.0.0:27017/";
    const dbname = 'shop';

    // const uri = "mongodb://0.0.0.0:27017/";
    // const client = new MongoClient(uri);

    // MongoClient.connect(url)
    // .then(function (dbname) {
    //     console.log(db);
    // })
    // .catch(function (err) {})
    MongoClient.connect(url,(err,data) => {
        if(err) return done(err);
        state.db = data.db(dbname);
        done();
    })
    
}

module.exports.get = function() {
    return state.db;
}
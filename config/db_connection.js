const { MongoClient } = require('mongodb');

const state = {
    db: null
};

module.exports.connect = function (done) {
    const url = 'mongodb+srv://sidhardhc:Mongo526626@database.4tqro37.mongodb.net/?retryWrites=true&w=majority&appName=DataBase';
    const dbname = 'EventX';

    MongoClient.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 30000, // Increase timeout to 30 seconds
        socketTimeoutMS: 45000   // Increase socket timeout to 45 seconds
    })
    .then((client) => {
        state.db = client.db(dbname);
        console.log('Database connection established');
        done();
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
        done(err);
    });
};

module.exports.get = function () {
    if (!state.db) {
        throw new Error('Database not connected');
    }
    return state.db;
};

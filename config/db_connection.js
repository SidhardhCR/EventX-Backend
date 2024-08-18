const { MongoClient } = require('mongodb');

const state = {
    db: null // Initialize 'db' as null
};

module.exports.connect = function (done) {
    const url = 'mongodb+srv://sidhardhcr007:Mongo%40526626@database.4tqro37.mongodb.net/';
    const dbname = 'EventX';

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((client) => {
            state.db = client.db(dbname);
            console.log('Database connection established:', state.db);
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

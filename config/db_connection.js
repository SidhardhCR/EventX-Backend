const { MongoClient } = require('mongodb');
const Grid = require('gridfs-stream');

const state = {
    db: null,
    gfs: null  // Add a GridFS stream reference
};

module.exports.connect = function (done) {
    const url = 'mongodb+srv://sidhardhc:Mongo526626@database.4tqro37.mongodb.net/?retryWrites=true&w=majority&appName=DataBase';
    const dbname = 'EventX';

    MongoClient.connect(url, {
        connectTimeoutMS: 60000, // Increase timeout to 60 seconds
        socketTimeoutMS: 60000,  // Increase socket timeout to 60 seconds
        serverSelectionTimeoutMS: 60000   // Increase socket timeout to 45 seconds
    })
        .then((client) => {
            state.db = client.db(dbname);
            console.log('Database connection established');

            // Initialize GridFS
            state.gfs = Grid(state.db, MongoClient);
            state.gfs.collection('uploads');

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

// Get GridFS instance
module.exports.getGFS = function () {
    if (!state.gfs) {
        throw new Error('GridFS not initialized');
    }
    return state.gfs;
};

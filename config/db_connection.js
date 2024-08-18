import { MongoClient } from 'mongodb';

const state = {
    db: null // Initialize 'db' as null
};

export function connect (done) {
    const url = 'mongodb+srv://sidhardhcr007:Mongo%40526626@database.4tqro37.mongodb.net/?retryWrites=true&w=majority&appName=DataBase';
    const dbname = 'EventX';

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((client) => {
            state.db = client.db(dbname);
            console.log('Database connection established');
            done(); // Call done without arguments on success
        })
        .catch((err) => {
            console.error('Database connection failed:', err);
            done(err); // Pass the error to done on failure
        });
}

export function get () {
    if (!state.db) {
        throw new Error('Database not connected');
    }
    return state.db;
}

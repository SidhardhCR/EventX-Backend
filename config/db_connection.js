const mongoClient = require('mongodb').MongoClient

const state = {
    db
}


module.exports.connect = function (done) {
    const url = 'mongodb+srv://sidhardhcr007:Mongo%40526626@database.4tqro37.mongodb.net/'
    const dbname = 'EventX'

    mongoClient.connect(url).then((client) => {
        state.db = client.db(dbname)
        console.log(state.db)
        done()
    }).catch((err) => {
        console.log(err)
        return done(err)
    })
}

module.exports.get = function () {
    return state.db
}
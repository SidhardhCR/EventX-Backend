
var promise = require('promise')
var db = require('../config/db_connection')
var collection = require('../config/db_collections')


module.exports={
    create_event:(event)=>{
        return (new promise((resolve,reject)=>{
            db.get().collection(collection.Collecton_Events).insertOne(event).then((response)=>{
                console.log(response)
                resolve(response.insertedId.toString())
            })
        }))
    }
}
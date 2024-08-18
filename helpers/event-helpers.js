
import promise from 'promise'
import { get } from '../config/db_connection'
import { Collecton_Events } from '../config/db_collections'


export function create_event(event) {
    return (new promise((resolve, reject) => {
        get().collection(Collecton_Events).insertOne(event).then((response) => {
            console.log(response)
            resolve(response.insertedId.toString())
        })
    }))
}
export function get_events() {
    return (new promise(async (resolve, reject) => {
        let events = await get().collection(Collecton_Events).find().toArray()
        resolve(events)
    }))
}
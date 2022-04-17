const mongoose = require('mongoose')
class MongoConnection {
    constructor() {}

    async connectToDb() {
        await mongoose.connect(`${process.env.MONGO_CONNECTION}`)
        console.log("Connected to DB!");
    }
}
module.exports = MongoConnection

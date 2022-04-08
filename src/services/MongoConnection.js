const mongoose = require('mongoose')
class MongoConnection {
    constructor() {}

    async connectToDb() {
        await mongoose.connect(`${process.env.MONGO_CONNECTION}`)
    }
}
module.exports = MongoConnection

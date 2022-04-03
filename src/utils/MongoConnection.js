const mongoose = require('mongoose')
class MongoConnection {
    constructor() {}

    async connectToDb() {
        console.log(process.env.MONGO_CONNECTION, process.env.SMOKING_GROUP)
        await mongoose.connect(`${process.env.MONGO_CONNECTION}`)
    }
}
module.exports = MongoConnection

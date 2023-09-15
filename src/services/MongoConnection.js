const mongoose = require('mongoose')
const consoleColorCodes = require('../../config/consts')
class MongoConnection {
    constructor() {}

    async connectToDb() {
        await mongoose.connect(`${process.env.MONGO_CONNECTION}`)
        console.info(
            consoleColorCodes.boldGreen,
            '{ MongoConnection: Connected to DB! }'
        )
    }
}
module.exports = MongoConnection

import mongoose from 'mongoose'
import { consoleColorCodes } from '../../config/consts'

class MongoConnection {
    constructor() {}

    async connectToDb(): Promise<void> {
        await mongoose.connect(`${process.env.MONGO_CONNECTION}`)
        console.info(consoleColorCodes, '{ MongoConnection: Connected to DB! }')
    }
}

export default MongoConnection

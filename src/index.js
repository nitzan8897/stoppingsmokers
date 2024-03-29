const { Client, LocalAuth } = require('whatsapp-web.js')
const CommandHandler = require('./services/CommandHandler')
const EventHandler = require('./services/EventHandler')
const ConfigHandler = require('./services/ConfigHandler')
const MongoConnection = require('./services/MongoConnection')
const SeasonManager = require('./services/SeasonManager')
const IntervalMessages = require('./services/IntervalMessages')
const ClientUtils = require('./services/ClientUtils')
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const startBot = async () => {
    const client = new Client({
        authStrategy: new LocalAuth({ dataPath: './.wwebjs_auth/session' }),
    })
    await new MongoConnection().connectToDb()
    new ConfigHandler(client).init()
    new CommandHandler(client).init()
    new EventHandler(client).init()
    await SeasonManager.init()
    new IntervalMessages(client).init()
    await client.initialize()
    await ClientUtils.catchUpOnMessages(client)
}

startBot()

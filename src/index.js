const { Client, LegacySessionAuth, NoAuth } = require('whatsapp-web.js')
const CommandHandler = require('./utils/CommandHandler')
const EventHandler = require('./utils/EventHandler')
const ConfigHandler = require('./utils/ConfigHandler')
const MongoConnection = require('./utils/MongoConnection')
const Session = require('./utils/Session')
const IntervalMessages = require('./utils/IntervalMessages')
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const startBot = async () => {
    const session = Session.getInstance()
    const client = new Client({
        authStrategy: new NoAuth(),
    })
    await new MongoConnection().connectToDb()
    new ConfigHandler(client).init()
    new CommandHandler(client).init()
    new EventHandler(client).init()
    new IntervalMessages(client).init()
    client.initialize()
}

startBot()

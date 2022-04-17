const {
    Client,
    LegacySessionAuth,
    LocalAuth,
    NoAuth,
} = require('whatsapp-web.js')
const CommandHandler = require('./services/CommandHandler')
const EventHandler = require('./services/EventHandler')
const ConfigHandler = require('./services/ConfigHandler')
const MongoConnection = require('./services/MongoConnection')
const Session = require('./services/Session')
const SeasonManager = require('./services/SeasonManager')
const IntervalMessages = require('./services/IntervalMessages')
require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const startBot = async () => {
    const session = Session.getInstance()
    const client = new Client({
        authStrategy: new LocalAuth({ dataPath: './.wwebjs_auth/session' }),
    })
    await new MongoConnection().connectToDb()
    new ConfigHandler(client).init()
    new CommandHandler(client).init()
    new EventHandler(client).init()
    await SeasonManager.init()
    new IntervalMessages(client).init()
    client.initialize()
}

startBot()

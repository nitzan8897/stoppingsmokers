import { Client, LocalAuth } from 'whatsapp-web.js'
import CommandHandler from './services/CommandHandler'
import EventHandler from './services/EventHandler'
import ConfigHandler from './services/ConfigHandler'
import MongoConnection from './services/MongoConnection'
import SeasonManager from './services/SeasonManager'
import IntervalMessages from './services/IntervalMessages'
import ClientUtils from './services/ClientUtils'
import dotenv from 'dotenv'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

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

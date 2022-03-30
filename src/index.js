const { Client, LegacySessionAuth } = require("whatsapp-web.js");
const CommandHandler = require("./utils/CommandHandler");
const EventHandler = require("./utils/EventHandler");
const ConfigHandler = require("./utils/ConfigHandler");
const MongoConnection = require("./utils/MongoConnection");
const Session = require("./utils/Session");
const SeasonManager = require("./utils/SeasonManager");
const IntervalMessages = require("./utils/IntervalMessages");

const startBot = async () => {
  const session = Session.getInstance();
  const client = new Client({
    authStrategy: new LegacySessionAuth({
      session: session.sessionData,
    }),
  });
  await new MongoConnection().connectToDb();
  new ConfigHandler(client).init();
  new CommandHandler(client).init();
  new EventHandler(client).init();
  await SeasonManager.init();
  new IntervalMessages(client).init();
  client.initialize();
};

startBot();

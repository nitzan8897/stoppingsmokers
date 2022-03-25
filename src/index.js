const fs = require("fs");
const { Client, LegacySessionAuth } = require("whatsapp-web.js");
const CommandHandler = require("./utils/CommandHandler");
const EventHandler = require("./utils/EventHandler");
const ConfigHandler = require('./utils/ConfigHandler');
const Session = require("./utils/Session");

const startBot = () => {
  const session = Session.getInstance();
  const client = new Client({
    authStrategy: new LegacySessionAuth({
      session: session.sessionData,
    }),
  });

  new ConfigHandler(client).init();
  new EventHandler(client).init();
  new CommandHandler(client).init();
  client.initialize();
}

startBot();

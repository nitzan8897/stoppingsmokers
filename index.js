const fs = require("fs");
const qrcode = require("qrcode-terminal");
const { Client, LegacySessionAuth } = require("whatsapp-web.js");
const smokersGroup = "120363042915528875@g.us";
const testingGroup = "120363039173872331@g.us";
const motivations = require("./motivation.json");
// Path where the session data will be stored
const SESSION_FILE_PATH = "./session.json";

// Load the session data if it has been previously saved
let sessionData,
  stopMessage = require("./smokers.json");
console.log(stopMessage);
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({
  authStrategy: new LegacySessionAuth({
    session: sessionData,
  }),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client running!, stop the smokers :)");
});

// Save session values to the file upon successful auth
client.on("authenticated", (session) => {
  sessionData = session;
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
    if (err) {
      console.error(err);
    }
  });
});

client.on("message", async (message) => {
  let author;
  if (message.from === smokersGroup) {
    author = message.author;
    authorPhone = await client.getContactById(author);
    console.log(authorPhone);
    if (message.body === "🚬") {
      stopMessage[author]
        ? (stopMessage[author] = stopMessage[author] + 1)
        : (stopMessage[author] = 1);
      fs.writeFile("./smokers.json", JSON.stringify(stopMessage), (err) => {
        if (err) {
          console.error(err);
        }
      });
      client.sendMessage(
        message.from,
        `${
          motivations.messages[
            Math.floor(Math.random() * motivations.messages.length)
          ]
        } קיבלת +1`
      );
    }
  }
});

client.on("message", async (message) => {
  if (message.from === smokersGroup) {
    if (message.body === "!כמות") {
      author = message.author;
      authorPhone = await client.getContactById(author);
      client.sendMessage(
        smokersGroup,
        `${authorPhone.pushname}, יש לך כבר: ${stopMessage[author]}`
      );
    }
  }
});

client.initialize();

const SeasonMember = require("../models/SeasonMember");
const SeasonManager = require("../utils/SeasonManager");

module.exports.run = async (client, message, args) => {
  const author = args && args[0] ? args[0].slice(1) + "@c.us" : message.author;
  try {
    const authorPhone = await client.getContactById(author);
    if (!authorPhone.pushname) throw new Error("meow");
    const amount = await SeasonMember.find({ userId: author, season: SeasonManager.seasonNumber }).exec();
    client.sendBotMessage(
      client.chatId,
      `@${authorPhone.id.user}, יש לך כבר: ${amount}`,
      { mentions: [authorPhone] }
    );
  } catch (e) {
    client.sendBotMessage(
      client.chatId,
      "וואלה לא יודע מה קרה התרחשה שגיאה אחשילי פעם הבאה אולי"
    );
  }
};

module.exports.config = {
  name: "כמות",
  args: ["@מישהו"],
};

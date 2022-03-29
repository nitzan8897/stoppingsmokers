const SeasonMember = require("../models/SeasonMember");
const SeasonManager = require("../utils/SeasonManager");

const addUserToSeason = async (author) => {
  const user = await SeasonMember.findOne({ season: SeasonManager.seasonNumber, 'userId': author}).exec();
  if (user) return;

  const newMemberInSeason = new SeasonMember({ season: SeasonManager.seasonNumber, userId: author, amount: 0});
  await newMemberInSeason.save();
}

module.exports = async (client, message) => {
  if (message.from !== client.chatId) return;
  await addUserToSeason(message.author);
  if (message.body === "🚬") {
    client.commands.get("🚬").run(client, message);
    return;
  }

  const prefix = "!";
  if (!message.body.startsWith(prefix)) return;

  const messageArray = message.body.split(" ");
  const cmd = messageArray[0];
  const args = messageArray.slice(1);

  const commandfile = client.commands.get(
    cmd.slice(prefix.length).toString().toLowerCase()
  );
  if (commandfile) {
    commandfile.run(client, message, args);
  } else {
    client.commands.get("עזרה").run(client, message);
  }
};

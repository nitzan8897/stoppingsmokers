const {getTaggedPerson} = require("../utils/functions");
const {getCountOfUserThisSeason} = require("../utils/queries");

module.exports.run = async (client, message, args) => {
    const author = getTaggedPerson(message, args);
    const authorPhone = await client.getContactById(author);
    if (!authorPhone.pushname) throw new Error("meow");

    const amount = await getCountOfUserThisSeason(author);
    client.sendBotMessage(
        client.chatId,
        `אחשלנו היקר, עישנת הסיזן הזה ${amount} סיגריות, @${authorPhone.id.user}`,
        {mentions: [authorPhone]}
    );
};

module.exports.config = {
    name: "הסיזן",
    args: ["@מישהו"],
};

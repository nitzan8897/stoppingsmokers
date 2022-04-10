const CigaretteReport = require("../models/CigaretteReport");
const {getTaggedPerson, getIntroMessageForCount} = require("../utils/functions");
const {getAmountInADayOfUser} = require("../utils/queries");

module.exports.run = async (client, message, args) => {
    const author = getTaggedPerson(message, args);
    const authorContact = await client.getContactById(author);
    if (!authorContact.pushname) throw Error("meow");

    const amount = await getAmountInADayOfUser(author, new Date());
    const extraMessage = getIntroMessageForCount(amount);
    client.sendBotMessage(
        client.chatId,
        `${extraMessage}, עישנת ${amount} סיגריות היום @${authorContact.id.user}`,
        {mentions: [authorContact]}
    );
};

module.exports.config = {
    name: "היום",
    args: ["@מישהו"],
};

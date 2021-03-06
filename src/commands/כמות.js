const CigaretteReport = require("../models/CigaretteReport");
const {getTaggedPerson} = require("../utils/functions");
const {getCountOfUser} = require("../utils/queries");

module.exports.run = async (client, message, args) => {
    const author = getTaggedPerson(message, args);
    const authorContact = await client.getContactById(author);
    if (!authorContact.pushname) throw new Error("meow");

    const amount = await getCountOfUser(author);
    client.sendBotMessage(
        client.chatId,
        `@${authorContact.id.user}, יש לך כבר: ${amount}\nשזה שווה ערך ל${(amount * 1.5).toFixed(1)} שקלים יא פראייר חחחחחחחחחחח`,
        {mentions: [authorContact]}
    );
};

module.exports.config = {
    name: "כמות",
    args: ["@מישהו"],
};

const {tryToRecoverReportsOfUser} = require("../utils/queries");

module.exports.run = async (client, message) => {
    const author = message.author;
    const authorContact = await client.getContactById(author);
    if (!authorContact.pushname) throw Error("meow");

    tryToRecoverReportsOfUser(author);
    const extraMessage = `ניסיתי לשחזר חיים שלי תבדוק אם עבד`;
    client.sendBotMessage(
        client.chatId,
        `${extraMessage} @${authorContact.id.user}`,
        {mentions: [authorContact]}
    );
};

module.exports.config = {
    name: "שחזר"
};

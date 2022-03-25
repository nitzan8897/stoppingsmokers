module.exports.run = async (client, message) => {
    const author = message.author;
    authorPhone = await client.getContactById(author);
    client.sendMessage(client.chatId, `${authorPhone.pushname}, יש לך כבר: ${stopMessage[author]}`);
}

module.exports.config = {
    name: "כמות"
}
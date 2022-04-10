const {getTaggedPerson} = require("../utils/functions");
const {getLastCigaretteTimeOfUser} = require("../utils/queries");

module.exports.run = async (client, message, args) => {
    const author = getTaggedPerson(message, args);
    const authorContact = await client.getContactById(author);

    const lastCigaretteTime = await getLastCigaretteTimeOfUser(author);
    const lastCigaretteDate = new Date(lastCigaretteTime.date);
    const now = new Date();

    let differenceInSeconds = (now - lastCigaretteDate) / 1000;
    const days = (Math.floor(differenceInSeconds / 86400)).toFixed(0);
    differenceInSeconds -= days * 86400;
    const hours = (Math.floor(differenceInSeconds / 3600) % 24).toFixed(0);
    differenceInSeconds -= hours * 3600;
    const minutes = (Math.floor(differenceInSeconds / 60) % 60).toFixed(0);
    differenceInSeconds -= minutes * 60;
    const seconds = (differenceInSeconds % 60).toFixed(0);

    const introMessage = `@${authorContact.id.user} אתה בלי הסיגי כבר`;
    const dayMessage = days > 0 ? ` ${days} ימים,` : ``;
    const hourMessage = hours > 0 || days > 0 ? ` ${hours} שעות,`: ``;
    const minuteMessage = minutes > 0 || hours > 0 || days > 0 ? ` ${minutes} דקות,` : ``;
    const secondMessage = ` ו${seconds} שניות`;
    const lastCigaretteMessage = `${introMessage}${dayMessage}${hourMessage}${minuteMessage}${secondMessage}`;
    client.sendBotMessage(client.chatId, lastCigaretteMessage, {mentions: [authorContact]});
}

module.exports.config = {
    name: 'האחרונה',
    args: ["@מישהו"]
}

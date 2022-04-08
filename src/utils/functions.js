const getTaggedPerson = (message, args) => {
    return args && args[0] ? args[0].slice(1) + "@c.us" : message.author;
}

getTopSmokersMessage = (topSmokers) => {
    let message = ``;
    topSmokers.forEach((smoker, index) => {
        mentions.push(smoker._id)
        const user = `@${smoker._id.id.user}`
        const amount = smoker.total
        const place = index + 1
        message += `במקום ה${place} עם ${amount}, ${user} \n`
    });

    return message;
};

const DAYS_IN_HEBREW = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

module.exports = {getTaggedPerson, DAYS_IN_HEBREW, getTopSmokersMessage};
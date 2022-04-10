const getTaggedPerson = (message, args) => {
    return args && args[0] ? args[0].slice(1) + "@c.us" : message.author;
}

const getTopSmokersMessage = (topSmokers, mentions) => {
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

const getIntroMessageForCount = (amount) => {
    if (amount === 0) {
        return "פייי ילד טוב אתה אינעל העולם";
    } else if (amount <= 3) {
        return "וואלה אתה בסדר אתה";
    } else if (amount <= 6) {
        return "תרגיע עם הכמות כפרה";
    } else if (amount <= 9) {
        return "מה יהיה איתך תגיד לי";
    } else if (amount <= 12) {
        return "אני מבין אתה אובדני היום אה יזין";
    } else {
        return "אברהמסון, כוכבית 9933";
    }
};

module.exports = {getTaggedPerson, DAYS_IN_HEBREW, getTopSmokersMessage, getIntroMessageForCount};
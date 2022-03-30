const CigaretteReport = require("../models/CigaretteReport");

const DAYS_IN_HEBREW = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];

const getLovedDayMessage = async (userId) => {
    const mostLovedDayAndAmount = await CigaretteReport.aggregate([
        {$match: {'userId': userId}},
        {$group: {_id: '$day', total: {$sum: 1}}},
        {$sort: {total: -1}},
        {$limit: 3}
    ]).exec();
    const mostLovedDay = DAYS_IN_HEBREW[mostLovedDayAndAmount[0]._id];
    const mostLovedDayIndex = DAYS_IN_HEBREW.indexOf(mostLovedDay);
    const introMessage = mostLovedDayIndex >= 4 ? 'אתה מת על הסופשים אה??' :
        mostLovedDayIndex === 0 ? 'יום ראשון נופל עלייך חזק' : 'אתה בחור של אמצע שבוע';
    const mainMessage = `היום האהוב עלייך לעישון הוא ${DAYS_IN_HEBREW[mostLovedDayAndAmount[0]._id]} עם ${mostLovedDayAndAmount[0].total} סיגריות `;
    const extraMessage = mostLovedDayAndAmount.slice(1).filter((day) => day.total > 0).map((day) => `\nולאחריו יום ${DAYS_IN_HEBREW[day._id]} עם ${day.total} סיגריות`).join('');
    return `*${introMessage}*\n${mainMessage} ${extraMessage}`;
}

const getLovedHourMessage = async (userId) => {
    const mostLovedHourAndAmount = await CigaretteReport.aggregate([
        {$match: {'userId': userId}},
        {$group: {_id: '$hour', total: {$sum: 1}}},
        {$sort: {total: -1}},
        {$limit: 5}
    ]).exec();
    const mostLovedHour = mostLovedHourAndAmount[0]._id;
    const introMessage = mostLovedHour >= 0 && mostLovedHour <= 4 ? 'חיית לילה אתה אני מבין' :
        mostLovedHour >= 19 && mostLovedHour <= 23 ? 'נופל לעישונים של הערב אתה' :
        mostLovedHour >= 12 && mostLovedHour <= 18 ? 'עם הארוחת צהריים אתה אוהב לפרק פאקט' :
        mostLovedHour >= 5 && mostLovedHour <= 11 ? 'כולם רצים בבוקר, רק אתה מעשן' :
            'משהו לא ברור אתה';
    const mainMessage = `השעה האהובה עלייך לעישון היא ${[mostLovedHourAndAmount[0]._id + ":00"]} עם ${mostLovedHourAndAmount[0].total} סיגריות בכולל`;
    const extraMessage = mostLovedHourAndAmount.slice(1).filter((hour) => hour.total > 0).map((hour) => `\nולאחריו השעה ${hour._id + ':00'} עם ${hour.total} סיגריות`).join('');
    return `\n*${introMessage}*\n${mainMessage} ${extraMessage}`;
}

module.exports.run = async (client, message, args) => {
    const author = args && args[0] ? args[0].slice(1) + "@c.us" : message.author;
    try {
        const authorPhone = await client.getContactById(author);
        if (!authorPhone.pushname) throw new Error("meow");
        const mostLovedDayMessage = await getLovedDayMessage(author);
        const mostLovedHourMessage = await getLovedHourMessage(author);
        client.sendBotMessage(
            client.chatId,
            `סטטיסטיקות ל@${authorPhone.id.user} \n\n ${mostLovedDayMessage} \n ${mostLovedHourMessage}`,
            {mentions: [authorPhone]}
        );
    } catch (e) {
        client.sendBotMessage(
            client.chatId,
            "וואלה לא יודע מה קרה התרחשה שגיאה אחשילי פעם הבאה אולי"
        );
    }
};

module.exports.config = {
    name: "סטטיסטיקה",
    args: ["@מישהו"],
};

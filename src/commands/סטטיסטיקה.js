const {DAYS_IN_HEBREW, getTaggedPerson} = require("../utils/functions");
const {getMostCommonTimestampOfUser} = require("../utils/queries");

const getLovedDayMessage = async (userId) => {
    const mostLovedDayAndAmount = await getMostCommonTimestampOfUser(userId,'$day', 3);
    const mostLovedDay = DAYS_IN_HEBREW[mostLovedDayAndAmount[0]._id];
    const mostLovedDayIndex = DAYS_IN_HEBREW.indexOf(mostLovedDay);
    const introMessage = mostLovedDayIndex >= 4 ? 'אתה מת על הסופשים אה??' :
        mostLovedDayIndex === 0 ? 'יום ראשון נופל עלייך חזק' : 'אתה בחור של אמצע שבוע';
    const mainMessage = `היום האהוב עלייך לעישון הוא ${DAYS_IN_HEBREW[mostLovedDayAndAmount[0]._id]} עם ${mostLovedDayAndAmount[0].total} סיגריות `;
    const extraMessage = mostLovedDayAndAmount.slice(1).filter((day) => day.total > 0).map((day) => `\nולאחריו יום ${DAYS_IN_HEBREW[day._id]} עם ${day.total} סיגריות`).join('');
    return `*${introMessage}*\n${mainMessage} ${extraMessage}`;
}

const getLovedHourMessage = async (userId) => {
    const mostLovedHourAndAmount = await getMostCommonTimestampOfUser(userId,'$hour', 5);
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
    const author = getTaggedPerson(message, args);
    const authorContact = await client.getContactById(author);
    if (!authorContact.pushname) throw new Error();

    const mostLovedDayMessage = await getLovedDayMessage(author);
    const mostLovedHourMessage = await getLovedHourMessage(author);
    client.sendBotMessage(
        client.chatId,
        `סטטיסטיקות ל@${authorContact.id.user} \n\n ${mostLovedDayMessage} \n ${mostLovedHourMessage}`,
        {mentions: [authorContact]}
    );
};

module.exports.config = {
    name: "סטטיסטיקה",
    args: ["@מישהו"],
};

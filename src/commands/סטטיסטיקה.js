const {DAYS_IN_HEBREW, getTaggedPerson, getIntroMessageForCount} = require("../utils/functions");
const {getMostCommonTimestampOfUser, getCountOfUser, getAveragePerDayOfUser} = require("../utils/queries");

const getLovedDayMessage = async (userId, totalAmount) => {
    const mostLovedDayAndAmount = await getMostCommonTimestampOfUser(userId,'$day', 3);
    const mostLovedDay = DAYS_IN_HEBREW[mostLovedDayAndAmount[0]._id];
    const mostLovedDayIndex = DAYS_IN_HEBREW.indexOf(mostLovedDay);
    const introMessage = mostLovedDayIndex >= 4 ? 'אתה מת על הסופשים אה??' :
        mostLovedDayIndex === 0 ? 'יום ראשון נופל עלייך חזק' : 'אתה בחור של אמצע שבוע';
    const mainMessage = `היום האהוב עלייך לעישון הוא ${DAYS_IN_HEBREW[mostLovedDayAndAmount[0]._id]} עם ${mostLovedDayAndAmount[0].total} סיגריות (${(mostLovedDayAndAmount[0].total / totalAmount * 100).toFixed(2)}%)`;
    const extraMessage = mostLovedDayAndAmount.slice(1).filter((day) => day.total > 0).map((day) => `\nולאחריו יום ${DAYS_IN_HEBREW[day._id]} עם ${day.total}  סיגריות(${(day.total / totalAmount * 100).toFixed(2)}%)`).join('');
    return `*${introMessage}*\n${mainMessage} ${extraMessage}`;
}

const getLovedHourMessage = async (userId, totalAmount) => {
    const mostLovedHourAndAmount = await getMostCommonTimestampOfUser(userId,'$hour', 5);
    const mostLovedHour = mostLovedHourAndAmount[0]._id;
    const introMessage = mostLovedHour >= 0 && mostLovedHour <= 4 ? 'חיית לילה אתה אני מבין' :
        mostLovedHour >= 19 && mostLovedHour <= 23 ? 'נופל לעישונים של הערב אתה' :
            mostLovedHour >= 12 && mostLovedHour <= 18 ? 'עם הארוחת צהריים אתה אוהב לפרק פאקט' :
                mostLovedHour >= 5 && mostLovedHour <= 11 ? 'כולם רצים בבוקר, רק אתה מעשן' :
                    'משהו לא ברור אתה';
    const mainMessage = `השעה האהובה עלייך לעישון היא ${[mostLovedHourAndAmount[0]._id + ":00"]} עם ${mostLovedHourAndAmount[0].total} סיגריות בכולל (${(mostLovedHourAndAmount[0].total / totalAmount * 100).toFixed(2)}%)`;
    const extraMessage = mostLovedHourAndAmount.slice(1).filter((hour) => hour.total > 0).map((hour) => `\nולאחריו השעה ${hour._id + ':00'} עם ${hour.total} סיגריות(${(hour.total / totalAmount * 100).toFixed(2)}%)`).join('');
    return `\n*${introMessage}*\n${mainMessage} ${extraMessage}`;
}

const getAveragePerDayMessage = async (userId) => {
    const averagePerDay = getAveragePerDayOfUser(userId);
    const introMessage = getIntroMessageForCount(averagePerDay);

    return `\n${introMessage}, אתה מעשן ${averagePerDay} סיגריות ביום בממוצע`;
}

module.exports.run = async (client, message, args) => {
    const author = getTaggedPerson(message, args);
    const authorContact = await client.getContactById(author);
    if (!authorContact.pushname) throw new Error();

    const totalAmount = await getCountOfUser(author);
    const mostLovedDayMessage = await getLovedDayMessage(author, totalAmount);
    const mostLovedHourMessage = await getLovedHourMessage(author, totalAmount);
    const averagePerDayMessage = await getAveragePerDayMessage(author);
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

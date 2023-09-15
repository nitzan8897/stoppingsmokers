import { DAYS_IN_HEBREW } from '../../config/consts'
import { getTaggedPerson } from '../utils/functions'
import { getMostCommonTimestampOfUser, getCountOfUser } from '../utils/queries'

interface MostLovedTimestamp {
    _id: number
    total: number
}

const getLovedDayMessage = async (
    userId: string,
    totalAmount: number
): Promise<string> => {
    const mostLovedDayAndAmount: MostLovedTimestamp[] =
        await getMostCommonTimestampOfUser(userId, '$day', 3)
    const mostLovedDay: string = DAYS_IN_HEBREW[mostLovedDayAndAmount[0]._id]
    const mostLovedDayIndex: number = DAYS_IN_HEBREW.indexOf(mostLovedDay)
    const introMessage: string =
        mostLovedDayIndex >= 4
            ? 'אתה מת על הסופשים אה??'
            : mostLovedDayIndex === 0
            ? 'יום ראשון נופל עלייך חזק'
            : 'אתה בחור של אמצע שבוע'
    const mainMessage: string = `היום האהוב עלייך לעישון הוא ${
        DAYS_IN_HEBREW[mostLovedDayAndAmount[0]._id]
    } עם ${mostLovedDayAndAmount[0].total} סיגריות (${(
        (mostLovedDayAndAmount[0].total / totalAmount) *
        100
    ).toFixed(2)}%)`
    const extraMessage: string = mostLovedDayAndAmount
        .slice(1)
        .filter((day) => day.total > 0)
        .map(
            (day) =>
                `\nולאחריו יום ${DAYS_IN_HEBREW[day._id]} עם ${
                    day.total
                } סיגריות (${((day.total / totalAmount) * 100).toFixed(2)}%)`
        )
        .join('')
    return `*${introMessage}*\n${mainMessage} ${extraMessage}`
}

const getLovedHourMessage = async (
    userId: string,
    totalAmount: number
): Promise<string> => {
    const mostLovedHourAndAmount: MostLovedTimestamp[] =
        await getMostCommonTimestampOfUser(userId, '$hour', 5)
    const mostLovedHour: number = mostLovedHourAndAmount[0]._id
    const introMessage: string =
        mostLovedHour >= 0 && mostLovedHour <= 4
            ? 'חיית לילה אתה אני מבין'
            : mostLovedHour >= 19 && mostLovedHour <= 23
            ? 'נופל לעישונים של הערב אתה'
            : mostLovedHour >= 12 && mostLovedHour <= 18
            ? 'עם הארוחת צהריים אתה אוהב לפרק פאקט'
            : mostLovedHour >= 5 && mostLovedHour <= 11
            ? 'כולם רצים בבוקר, רק אתה מעשן'
            : 'משהו לא ברור אתה'

    const mainMessage: string = `השעה האהובה עלייך לעישון היא ${[
        mostLovedHourAndAmount[0]._id + ':00',
    ]} עם ${mostLovedHourAndAmount[0].total} סיגריות בכולל (${(
        (mostLovedHourAndAmount[0].total / totalAmount) *
        100
    ).toFixed(2)}%)`

    const extraMessage: string = mostLovedHourAndAmount
        .slice(1)
        .filter((hour) => hour.total > 0)
        .map(
            (hour) =>
                `\nולאחריו השעה ${hour._id + ':00'} עם ${
                    hour.total
                } סיגריות (${((hour.total / totalAmount) * 100).toFixed(2)}%)`
        )
        .join('')

    return `\n*${introMessage}*\n${mainMessage} ${extraMessage}`
}

export const run = async (
    client: any,
    message: any,
    args: any[]
): Promise<void> => {
    const author: string = getTaggedPerson(message, args)
    const authorContact: any = await client.getContactById(author)
    if (!authorContact.pushname) throw new Error()

    const totalAmount: number = await getCountOfUser(author)
    const mostLovedDayMessage: string = await getLovedDayMessage(
        author,
        totalAmount
    )

    const mostLovedHourMessage: string = await getLovedHourMessage(
        author,
        totalAmount
    )

    client.sendBotMessage(
        client.chatId,
        `סטטיסטיקות ל@${authorContact.id.user} \n\n ${mostLovedDayMessage} \n ${mostLovedHourMessage}`,
        { mentions: [authorContact] }
    )
}

export const config = {
    name: 'סטטיסטיקה',
    args: ['@מישהו'],
}

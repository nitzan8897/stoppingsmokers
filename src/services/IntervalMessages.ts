import warnings from '../../config/warnings.json'
import SeasonManager from './SeasonManager'
import CigaretteReport from '../models/CigaretteReport'
import { getAmountInADayOfUser } from '../utils/queries'

class IntervalMessages {
    private readonly SECONDS_IN_A_DAY = 86400

    private readonly client: any

    constructor(client: any) {
        this.client = client
    }

    init(): void {
        this.startDailyMessageInterval()
        this.startSeasonMessageInterval()
    }

    private async startDailyMessageInterval(): Promise<void> {
        await this.waitForNewDay()
        this.sendWarning()
        setInterval(() => {
            this.sendWarning()
        }, this.SECONDS_IN_A_DAY * 1000)
    }

    private waitForNewDay(): Promise<void> {
        const now = new Date()
        const hour = now.getHours()
        const minutes = now.getMinutes()
        const seconds = now.getSeconds()
        const totalSecondsToday = (hour * 60 + minutes) * 60 + seconds
        const timeUntilTomorrow =
            (this.SECONDS_IN_A_DAY - totalSecondsToday) * 1000
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve()
            }, timeUntilTomorrow - 1000 * 20)
        })
    }

    private sendWarning(): void {
        const message = 'התחיל יום חדש, אולי היום לא תעשן מה אומר??'
        const warning =
            warnings.messages[
                Math.floor(Math.random() * warnings.messages.length)
            ]
        this.client.sendBotMessage(
            this.client.chatId,
            `${message}\n קח משהו לזעזע אותך\n ${warning}`
        )
        this.congratulateNonSmokersForToday()
    }

    private async congratulateNonSmokersForToday(): Promise<void> {
        let message = `קבלו את הילדים הטובים של היום שלא עישנו \n\n`
        const contacts = await CigaretteReport.find({}, { userId: 1 })
            .distinct('userId')
            .exec()
        const mentions: any[] = []
        for (const contactId of contacts) {
            const today = new Date()
            const amount = await getAmountInADayOfUser(contactId, today)
            if (amount === 0) {
                const contact = await this.client.getContactById(contactId)
                message += ` @${contact.id.user}`
                mentions.push(contact)
            }
        }
        if (mentions.length === 0) return
        this.client.sendBotMessage(this.client.chatId, message, {
            mentions: mentions,
        })
    }

    private async startSeasonMessageInterval(): Promise<void> {
        await this.waitForNewSeason()
        await this.switchSeasons()
        setInterval(() => {
            this.switchSeasons()
        }, SeasonManager.seasonTimeInDays * this.SECONDS_IN_A_DAY * 1000)
    }

    private waitForNewSeason(): Promise<void> {
        const now = new Date().getTime()
        const seasonTime = SeasonManager.seasonEnd.getTime()
        const timeUntilNewSeason = seasonTime - now
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve()
            }, timeUntilNewSeason)
        })
    }

    private announceOnSeasonEnd(): void {
        let message = `אני שמח להודיע בזאת על סיומו של סיזן ${SeasonManager.seasonNumber}`
        message += `\nעכשיו מתחילים סיזן חדש חבל עליכם אם אתם לא מעשנים פחות אה???`
        message += `\nקבלו את ההכי קיצוניים של הקבוצה`
        this.client.sendBotMessage(this.client.chatId, message)
        this.client.commands.get('🦀').run(this.client)
        this.client.commands.get('🏆').run(this.client)
    }

    private async switchSeasons(): Promise<void> {
        this.announceOnSeasonEnd()
        await SeasonManager.createNewSeason()
        this.announceOnSeasonStart()
    }

    private announceOnSeasonStart(): void {
        let message = `וברוכים הבאים לסיזן ${SeasonManager.seasonNumber}`
        message += `\nאולי נראה אתכם בטבלה של הילדים הטובים? או שאתם עושים בעיות 😈`
        this.client.sendBotMessage(this.client.chatId, message)
    }
}

export default IntervalMessages

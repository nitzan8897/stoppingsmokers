const warnings = require('../../warnings.json');
const CigaretteReport = require("../models/CigaretteReport");

class  IntervalMessages {
    #SECONDS_IN_A_DAY = 86400;

    constructor(client) {
        this.client = client;
    }

    init() {
        this.#startDailyMessageInterval();
    }

    async #startDailyMessageInterval() {
        await this.#waitForNewDay();
        this.#sendWarning();
        setInterval(() => {
            this.#sendWarning();
        }, this.#SECONDS_IN_A_DAY * 1000);
    }

    #waitForNewDay() {
        const now = new Date();
        const hour = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const totalSecondsToday = (hour * 60 + minutes) * 60 + seconds;
        const timeUntilTomorrow = (this.#SECONDS_IN_A_DAY - totalSecondsToday) * 1000;
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, timeUntilTomorrow - 1000 * 20);
        });
    }

    #sendWarning() {
        const message = 'התחיל יום חדש, אולי היום לא תעשן מה אומר??';
        const warning = warnings.messages[Math.floor(Math.random() * warnings.messages.length)];
        this.client.sendBotMessage(this.client.chatId, `${message}\n קח משהו לזעזע אותך\n ${warning}`);
        this.#congratulateNonSmokersForToday();
    }

    async #congratulateNonSmokersForToday() {
        let message = `קבלו את הילדים הטובים של היום שלא עישנו \n\n`;
        const contacts= await CigaretteReport.find({}, {userId: 1}).distinct('userId').exec();
        const mentions = [];
        for (const contactId of contacts) {
            const amount = await CigaretteReport.count({
                userId: contactId,
                day: new Date().getDay(),
                month: new Date().getMonth(),
                year: new Date().getFullYear(),
            }).exec();
            if (amount === 0) {
                const contact = await this.client.getContactById(contactId);
                message += ` @${contact.id.user}`;
                mentions.push(amount);
            }
        }
        if (mentions.length === 0) return;
        this.client.sendBotMessage(this.client.chatId, message, {mentions});
    }
}

module.exports = IntervalMessages;
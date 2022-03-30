const warnings = require('../../warnings.json');

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
            }, timeUntilTomorrow)
        });
    }

    #sendWarning() {
        const message = 'התחיל יום חדש, אולי היום לא תעשן מה אומר??';
        const warning = warnings.messages[Math.floor(Math.random() * warnings.messages.length)];
        this.client.sendBotMessage(this.client.chatId, `${message}\n קח משהו לזעזע אותך\n ${warning}`);
    }
}

module.exports = IntervalMessages;
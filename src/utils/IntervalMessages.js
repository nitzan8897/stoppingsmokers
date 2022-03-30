const warnings = require('../../warnings.json');
const SeasonManager = require("./SeasonManager");

class  IntervalMessages {
    #SECONDS_IN_A_DAY = 86400;

    constructor(client) {
        this.client = client;
    }

    init() {
        this.#startDailyMessageInterval();
        this.#startSeasonMessageInterval();
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

    async #startSeasonMessageInterval() {
        await this.#waitForNewSeason();
        await this.#switchSeasons();
        setInterval(() => {
            this.#switchSeasons();
        }, SeasonManager.seasonTimeInDays * this.#SECONDS_IN_A_DAY * 1000);
    }

    #waitForNewSeason() {
        const now = new Date().getTime();
        const seasonTime = SeasonManager.seasonEnd.getTime();
        const timeUntilNewSeason = (seasonTime - now);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, timeUntilNewSeason)
        });
    }

    #announceOnSeasonEnd() {
        let message = `אני שמח להודיע בזאת על סיומו של סיזן ${SeasonManager.seasonNumber}`;
        message += `\nעכשיו מתחילים סיזן חדש חבל עליכם אם אתם לא מעשנים פחות אה???`;
        message += `\nקבלו את ההכי קיצוניים של הקבוצה`;
        this.client.sendBotMessage(this.client.chatId, message);
        this.client.commands.get('🦀').run(this.client);
        this.client.commands.get('🏆').run(this.client);
    }

    async #switchSeasons() {
        this.#announceOnSeasonEnd();
        await SeasonManager.createNewSeason();
        this.#announceOnSeasonStart();
    }

    #announceOnSeasonStart() {
        let message = `וברוכים הבאים לסיזן ${SeasonManager.seasonNumber}`;
        message += `\nאולי נראה אתכם בטבלה של הילדים הטובים? או שאתם עושים בעיות 😈`;
        this.client.sendBotMessage(this.client.chatId, message);
    }
}

module.exports = IntervalMessages;
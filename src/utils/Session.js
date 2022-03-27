const fs = require("fs");

var Session = (function () {
    var instance;

    function createInstance() {
        const SESSION_FILE_PATH = "./session.json";
        let sessionData = undefined;
        if (fs.existsSync(SESSION_FILE_PATH)) {
            sessionData = JSON.parse(fs.readFileSync(SESSION_FILE_PATH));
        }

        return {
            sessionData
        };
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
        setSessionData: function (sessionData) {
            if (this.getInstance().sessionData) return;
            this.getInstance().sessionData = sessionData;
            fs.writeFile('./session.json', JSON.stringify(sessionData), (err) => {
                if (err) {
                  console.error(err);
            }
        })
        }
    };
})();

module.exports = Session;
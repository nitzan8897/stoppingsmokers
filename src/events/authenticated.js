const fs = require('fs');
const Session = require('../utils/Session');

module.exports = (client, session) => {
    Session.setSessionData(session);
};
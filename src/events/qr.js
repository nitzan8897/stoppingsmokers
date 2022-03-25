const qrcode = require("qrcode-terminal");

module.exports = (client, qr) => {
    qrcode.generate(qr, { small: true });
};
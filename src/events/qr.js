const qrcode = require('qrcode-terminal')

module.exports = (_client, qr) => {
    qrcode.generate(qr, { small: true })
}

import qrcode from 'qrcode-terminal'

export default (_client: any, qr: any) => {
    qrcode.generate(qr, { small: true })
}

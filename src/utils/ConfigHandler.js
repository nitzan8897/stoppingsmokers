const smokersGroup = "120363042915528875@g.us";
const testingGroup = "120363039173872331@g.us";

class ConfigHandler {
  constructor(client) {
    this.client = client;
  }

  init() {
    this.client.chatId = testingGroup;
    this.client.sendBotMessage = (chatId, message, options) => {
      const newMessage =
        "----------------------------------------\n" +
        message +
        "\n----------------------------------------";
      this.client.sendMessage(chatId, newMessage, options);
    };
  }
}

module.exports = ConfigHandler;

const mongoose = require("mongoose");

class MongoConnection {
  constructor() {}

  async connectToDb() {
    await mongoose.connect(
      "mongodb+srv://ajreuri23:vguzrvfhaha1@cigi.veynx.mongodb.net/test"
    );
  }
}

module.exports = MongoConnection;

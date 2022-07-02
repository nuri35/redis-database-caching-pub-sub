const Messages = require("./../messagesModel");
const Users = require("./../user");

const MessagesData = require("./messages");
const UsersData = require("./Users");

const exampleDataInformation = async () => {
  try {
    const usersCount = await Users.estimatedDocumentCount();
    if (usersCount <= 0) {
      console.log("writing users");
      await Users.create(UsersData);
      console.log("written users");
    }

    const messageCount = await Messages.estimatedDocumentCount();
    if (messageCount <= 0) {
      console.log("writing messages");
      await Messages.create(MessagesData);
      console.log("written messages");
    }
    console.log("alradyy have data");
  } catch (err) {
    console.log(err);
  }
};

module.exports = exampleDataInformation;

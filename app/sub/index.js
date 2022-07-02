const client = require("../../redis/index");

const subscriber = async () => {
  const channel = "message";
  await client.connect();

  await client.subscribe(channel, (messageStr) => {
    const message = JSON.parse(messageStr);
    console.log("sender", message.from);
    console.log("receiver", message.to);
    console.log(message.message);
    console.log("---------------------------------");
  });
};

subscriber()
  .then(() => {
    console.log("subscriber started");
  })
  .catch((err) => {
    console.log(err);
  });

const client = require("./../../redis/index");

const readChannels = async () => {
  await client.connect();
  const channels = await client.pubSubChannels();
  console.log("--------------------------");
  console.log(channels);
  process.exit(0);
};

readChannels()
  .then(() => {
    console.log("channels started");
  })
  .catch((err) => {
    console.log(err);
  });

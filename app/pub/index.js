const client = require("./../../redis/index");

const publisher = async () => {
  const channel = "message";
  const data = {
    from: "strutp acedemi",
    to: "can gokcanaslan",
    message: "test message success",
  };
  await client.connect();
  await client.publish(channel, JSON.stringify(data));
};

publisher()
  .then(() => {
    console.log("message published");
  })
  .catch((err) => {
    console.log(err);
  });

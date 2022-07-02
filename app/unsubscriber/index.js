const client = require("../../redis/index");

const subscribeAndUnsubscribe = async () => {
  const channel = "message";
  await client.connect();

  await client.subscribe(channel, (messageStr) => {
    const message = JSON.parse(messageStr);
    console.log("sender", message.from);
    console.log("receiver", message.to);
    console.log(message.message);
    console.log("---------------------------------");
  });

  let i = 0;
  const wait = 30;
  console.log("subscriber started will be down in 30 second");

  const timer = setInterval(() => {
    i++;
    console.log(wait - i, "seconds left");
  }, 1000);

  const waited = await new Promise((resolve, reject) => {
    setTimeout(() => {
      clearInterval(timer);
      resolve(true);
    }, wait * 1000);
  });
  if (waited === true) {
    await client.unsubscribe(channel);
    console.log("stop subscribing");
  }
};

subscribeAndUnsubscribe()
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

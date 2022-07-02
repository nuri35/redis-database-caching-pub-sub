const client = require("./../redis/index");
const Message = require("./../mongodb/messagesModel");

module.exports = (router) => {
  router.get("/cached/users", async (req, res) => {
    const obj = await client.hGetAll("user943230509");

    res.send(obj);
  });

  router.get("/cached/users-cached", async (req, res) => {
    try {
      const cacheKey = "users/first50";
      let users = await client.get(cacheKey);

      if (!users) {
        users = await client.hGetAll("user943230509");
        await client.set(cacheKey, JSON.stringify(users));
      } else {
        users = JSON.parse(users);
      }

      res.send(users);
    } catch (err) {
      console.log(err);
    }
  });

  /* Absolute timing  */
  router.get("/cached/users-cached-absolute", async (req, res) => {
    const cacheKey = "users/expire/first50";
    let users = await client.get(cacheKey);

    if (!users) {
      users = await client.hGetAll("user943230509");
      await client.set(cacheKey, JSON.stringify(users), {
        EX: 60,
        NX: true,
        KEEPTTL: true,
      });
    } else {
      users = JSON.parse(users);
    }
    res.send({ message: "cached users with absolute timing", users: users });
  });

  /* Sliding timing  */

  router.get("/cached/users-cached-sliding", async (req, res) => {
    try {
      const cacheKey = "users/expire/first50";
      let users = await client.get(cacheKey);

      if (!users) {
        users = await client.hGetAll("user943230509");
        await client.set(cacheKey, JSON.stringify(users), {
          EX: 60,
          NX: true,
          KEEPTTL: true,
        });
      } else {
        const GETEX_OLD = await client.ttl(cacheKey);
        console.log("cache would have been expired in ", GETEX_OLD, " seconds");
        await client.expire(cacheKey, 60);
        const GETEX_NEW = await client.ttl(cacheKey);
        console.log("cache will have been expired in ", GETEX_NEW, "seconds");

        users = JSON.parse(users);
      }

      res.send({ message: "cached users with silding timing", users: users });
    } catch (err) {
      console.log(err);
    }
  });

  router.get("/cached/messages", async (req, res) => {
    const messages = await Message.find({}).limit(50).lean();
    res.json({ msg: "NON CACHED MESSAGE", messages });
  });

  router.get("/cached/messages-cached", async (req, res) => {
    const cacheKey = "messages/1";

    let messages = await client.json.get(cacheKey);

    if (!messages) {
      messages = await Message.find({}).limit(50).lean();
      await client.json.set(cacheKey, "$", messages);
    }

    res.json({ msg: " CACHED MESSAGE", messages });
  });
};

const term = require("terminal-kit").terminal;
const mongoose = require("mongoose");
const Users = require("./../../mongodb/user");
const client1 = require("./../../redis/index");
const client2 = client1.duplicate();

const colors = ["magenta", "cyan", "yellow", "green", "red", "blue"];
term.clear("");

term.on("key", (key) => {
  if (key === "CTRL_C") {
    term.clear("");
    process.exit(0);
  }
});

const color = colors[Math.floor(Math.random() * colors.length)];

const user = {
  fullName: "",
  chatRoom: "323445",
  color: color,
};

let client1Connected = false;
let client2Connected = false;

const readIncomingMessage = async () => {
  const channel = `message/${user.chatRoom}`;

  if (!client2Connected) {
    await client2.connect();
    client2Connected = true;
  }

  await client2.subscribe(channel, (messageStr) => {
    const message = JSON.parse(messageStr);
    if (message.from !== user.fullName) {
      //eğer terminal uygulamaları yapılıcaksa  burdaki if koşulunu  uniq ıd uzerınden yapılır.
      term.deleteLine(1);
      term.previousLine(1);
      term.nextLine(1);
      term?.[message.color].bold(`${message.from}:`);
      term?.[message.color].bold("\n");
      term?.[message.color].bold(message.message);
      term?.[message.color].bold("\n");
      term?.[message.color].bold(new Date(message.sendAt).toLocaleString());
      term?.[message.color].bold("---------------------------------------");
      term?.[message.color].bold("\n");
      term.white("Enter your message");
    }
  });
};

const sendMessage = async (messageStr) => {
  const channel = `message/${user.chatRoom}`;
  const message = {
    from: user.fullName,
    chatRoom: user.chatRoom,
    message: messageStr.trim(),
    color: user.color,
    sendAt: new Date(),
  };

  if (!client1Connected) {
    await client1.connect();
    client1Connected = true;
  }
  await client1.publish(channel, JSON.stringify(message));
};

const listenForMessageSend = async () => {
  return new Promise(async (resolve, reject) => {
    term.white("Enter your message: ");
    const input = await term.inputField({
      submitKey: "Enter",
    }).promise;
    term.deleteLine(1);
    term.previousLine(1);
    term.nextLine(1);
    term?.[user.color].bold("you");
    term?.[user.color].bold("\n");
    term?.[user.color].bold(input);
    term?.[user.color].bold("\n");
    term?.[user.color].bold(new Date().toLocaleString());
    term?.[user.color].bold("---------------------------------------");
    term?.[user.color].bold("\n");
    sendMessage(input); //for pub
    resolve(input);
  });
};

const prompt = async (num = 0) => {
  if (num === 0) {
    const estimatedDocumentCount = await Users.estimatedDocumentCount();
    const randomSkip = Math.floor(Math.random() * (estimatedDocumentCount - 1));
    const loggedUser = await Users.findOne({}).skip(randomSkip).limit(1);

    term.white.bold(
      "logged as",
      " ",
      loggedUser?.name,
      " ",
      loggedUser?.surname,
      "\n"
    );
    term.white.bold("you can send a message now ", "\n");
    term.white.bold("-----------------------------------------------\n");
    user.fullName = loggedUser.name + " " + loggedUser.surname;
  }
  await listenForMessageSend();
  return await prompt(num + 1); //ılk calısınca num 0 oldugu ıcıın random kullanıcı olusturcak sonra artık senden mesaj bekleyecek o nasıl olcak recursive olarak  burası calıscak ve dolayısıyla num 0 olmadııg ıcın başka yer calısacak
};

mongoose
  .connect("mongodb://localhost:27017/redis")
  .then(async () => {
    console.log("mongodb connected");
    term.deleteLine(1);
    term.clear("");
    term.white("chat room ready!!");
    term.white("\n");
    prompt();
  })
  .catch((err) => {
    console.log(err);
  });

readIncomingMessage()
  .then(() => {})
  .catch((err) => {
    console.log(err);
  });

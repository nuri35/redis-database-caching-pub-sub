const term = require("terminal-kit").terminal;

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

mongoose
  .connect("mongodb://localhost:27017/redis")
  .then(async () => {
    console.log("mongodb connected");
    mongoConnected = true;
    // await exampleDataInformation()
  })
  .catch((err) => {
    console.log(err);
  });

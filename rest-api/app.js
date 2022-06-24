const express = require("express");
const app = express();
const port = 3000;
const connect = require("./models/index");
connect();
const router = require("./routes/router");
const render = require("./renders/index");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", router);
app.use("/", render);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`##### listening on port ${port} #####`);
});

const mongoose = require("mongoose");

const connect = () => {
  mongoose
    .connect("mongodb://localhost:27017/test", {})
    .catch((err) => console.log(err));
};

mongoose.connection.on("error", (err) => {
  console.error("mongoDB connect error", err);
});

mongoose.connection.on("disconnected", () => {
  console.error("mongoDB disconnect. reconnect");
  connect();
});

module.exports = connect;

require("dotenv").config();

async function googleChatTest(req, res) {
  try {
    const fetch = require("node-fetch");
    const webhookURL = process.env.GOOGLE_WEBHOOK_URL;

    const data = JSON.stringify({
      text: `test message server to google chat`,
    });
    let resp;
    fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: data,
    }).then((response) => {
      resp = response;
      console.log(response);
    });
    res.status(200).send(resp);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      errorMessage: "fail.",
    });
  }
}

module.exports = {
  googleChatTest,
};

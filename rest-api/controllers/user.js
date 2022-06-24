const users = require("../models/users");

async function getAllUsers(req, res) {
  try {
    const allUsers = await users.find({});
    res.status(200).send(allUsers);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      errorMessage: "fail get users.",
    });
  }
}
async function getUser(req, res) {
  try {
    const { id } = req.params;
    const user = await users.findOne({ id });
    if (!user) {
      res.status(400).send({
        errorMessage: "no exist user.",
      });
      return;
    }
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(400).send({
      errorMessage: "fail get user",
    });
  }
}

async function createUser(req, res) {
  try {
    const { email, name, password } = req.body;
    const existUser = await users.findOne({ email });
    if (existUser) {
      res.status(400).send({
        errorMessage: "already exist email.",
      });
      return;
    }
    await users.create({
      email,
      name,
      password,
    });
    res.status(201).send();
  } catch (err) {
    console.log(err);
    res.status(400).send({
      errorMessage: "fail create user.",
    });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const user = await users.findOne({ id });
    if (!user) {
      res.status(400).send({
        errorMessage: "no exist user.",
      });
      return;
    }

    const { email, name, password } = req.body;

    await users.updateOne(
      { admin_id },
      {
        $set: {
          email,
          name,
          password,
        },
      }
    );
    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(400).send({
      errorMessage: "fail update user.",
    });
  }
}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const user = await users.findOne({ id });
    if (!user) {
      res.status(400).send({
        errorMessage: "no exist user.",
      });
      return;
    }
    await users.deleteOne({ id });
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(400).send({
      errorMessage: "fail delete user.",
    });
  }
}
module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

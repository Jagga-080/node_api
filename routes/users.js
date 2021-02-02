var express = require("express");
const { userModal } = require("../modals/userModal");
const { getToken } = require("../util");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send("hey i am working");
});
router.post("/register", async (req, res) => {
  console.log(req.body);
  const user = new userModal({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const newUser = await user.save();
  if (newUser) {
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } else {
    res.status(401).send({ message: "Invalid User Data." });
  }
});
router.post("/signin", async (req, res) => {
  const isUser = await userModal.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (isUser) {
    res.send({
      _id: isUser.id,
      name: isUser.name,
      email: isUser.email,
      isAdmin: isUser.isAdmin,
      token: getToken(isUser),
    });
  } else {
    res.status(401).send({ message: "Invalid Email or Password." });
  }
});

module.exports = router;

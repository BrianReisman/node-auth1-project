const helpers = require("../users/users-model");

const restricted = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "you shall not pass!" });
  }
};

const checkUsernameFree = async (req, res, next) => {
  const check = await helpers.findBy({ username: req.body.username });
  if (check[0]) {
    res.status(400).json({ message: "username taken" });
  } else {
    next();
  }
};

/*
  If the username in req.body does NOT exist in the database

  status 401
  {
    "message": "Invalid credentials"
  }
*/
const checkUsernameExists = async (req, res, next) => {
  console.log(req.body.username);
  const exists = await helpers.findBy({ username: req.body.username }).first();
  if (exists) {
    next();
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};

const checkPasswordLength = (req, res, next) => {
  if (req.body.password.length < 4) {
    res.status(422).json({ message: "Password must be longer than 3 chars" });
  } else {
    next();
  }
};

module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength,
};

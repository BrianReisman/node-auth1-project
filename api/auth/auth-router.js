const router = require("express").Router();
// const {
// checkUsernameFree,
// checkUsernameExists,
// checkPasswordLength,
// } = require("./auth-middleware");

const bcrypt = require("bcryptjs"); //package for hashing
const Users = require("../users/users-model"); //helper functions

router.post("/register", async (req, res, next) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  try {
    const saved = await Users.add(user);
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
});

/**
  1 [POST] /api/auth/register { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "user_id": 2,
    "username": "sue"
  }

  response on username taken:
  status 422
  {
    "message": "Username taken"
  }

  response on password three chars or less:
  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
 */

router.post("/login", async (req, res, next) => {
  console.log(req.session);

  const { username, password } = req.body;
  try {
    const user = await Users.findBy({ username }).first();
    if (user && bcrypt.compareSync(password, user.password)) {
      req.session.user = user;
      console.log(req.session)
      res.status(200).json({ message: `Welcome ${user.username}!` });
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/logout", (req, res) => {
  console.log(req.session);
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).json({ message: "error logging out:", error: err });
      } else {
        console.log(req.session);
        res.json({ message: "you've bee logged out" });
      }
    });
  } else {
    res.status(400).json({ message: "no session" });
  }
});
module.exports = router;

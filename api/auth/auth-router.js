const router = require("express").Router();
const {
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength,
} = require("./auth-middleware");

const bcrypt = require("bcryptjs"); //package for hashing
const Users = require("../users/users-model"); //helper functions

router.post(
  //!{POST} password included
  "/register", // checkUsernameFree, // checkUsernameExists, // checkPasswordLength,
  async (req, res, next) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

    try {
      const saved = await Users.add(user)
      res.status(201).json(saved)
      
    } catch (err) {
      next(err)      
    }

  }
);
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

router.post("/login", (req, res) => {
  console.log("login");
});
/**
  2 [POST] /api/auth/login { "username": "sue", "password": "1234" }

  response:
  status 200
  {
    "message": "Welcome sue!"
  }

  response on invalid credentials:
  status 401
  {
    "message": "Invalid credentials"
  }
 */

router.get("/logout", (req, res) => {
  console.log("logout");
});
/**
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
 */

module.exports = router;

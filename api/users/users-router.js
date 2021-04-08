// Require the `restricted` middleware from `auth-middleware.js`. You will need it here! //!I added it in servie to this entire route.

const router = require("express").Router();
const User = require("./users-model");
const middleware = require('../auth/auth-middleware');

router.get("/", middleware.restricted, async (req, res) => {
  console.log('user-router', req.session)
  try {
    const users = await User.find();
    if (users) {
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(400).json({ message: "no users found" });
  }
});
/**
 * //*This is true only if the request makes it out of the restricted middleware.
  This endpoint is RESTRICTED: only authenticated clients
  should have access.

  // response:
  // status 200
  // [
  //   {
  //     "user_id": 1,
  //     "username": "bob"
  //   },
  //   // etc
  // ]

  //!This message gets sent from the middleware
  response on non-authenticated:
  status 401
  {
    "message": "You shall not pass!"
  }
 */


module.exports = router;

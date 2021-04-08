const helpers = require('../users/users-model')

const restricted = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "you shall not pass!" });
  }
};

/*
  If the username in req.body already exists in the database

  status 422
  {
    "message": "Username taken"
  }
*/
const checkUsernameFree = async (req, res, next) => {
  const check = await helpers.findBy({username: req.body.username})
  if(check[0]){
    res.status(400).json({message: 'username taken'})
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
const checkUsernameExists = (req, res, next) => {
  console.log("checkUsernameExists");
  next();
};
/*
  If password is missing from req.body, or if it's 3 chars or shorter

  status 422
  {
    "message": "Password must be longer than 3 chars"
  }
*/
const checkPasswordLength = (req, res, next) => {
  console.log("checkPasswordLength");
  next();
};

module.exports = {
  restricted,
  checkUsernameFree,
  checkUsernameExists,
  checkPasswordLength,
};

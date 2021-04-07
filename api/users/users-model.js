// !import the db
const db = require("../../data/db-config");

/**
  resolves to an ARRAY with all users, each user having { user_id, username }
 */
function find() {
  return db("users");
}

/**
  resolves to an ARRAY with all users that match the filter condition
 */
function findBy(filter) {
  return db("users").where(filter).orderBy('user_id')
}

/**
  resolves to the user { user_id, username } with the given user_id
 */
const findById = (user_id) => {
  return db('users').where({user_id})
}
/**
  resolves to the newly inserted user { user_id, username }
 */
function add(user) {
  // !! See GP
  return db.insert(user)
}

module.exports = {
  find,
  findBy,
  findById,
  add,
};

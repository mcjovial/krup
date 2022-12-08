const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const db = require("_helpers/db");
const Role = require("_helpers/role");
const User = require("./users.model");

module.exports = {
  authenticate,
  register,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function authenticate({ email, password, contact }) {
  let user;
  if(email) user = await User.findOne({ email });
  if(contact) user = await User.findOne({ contact });

  if (
    !user ||
    !bcrypt.compareSync(password, user.password)
  ) {
    throw "Email or password is incorrect";
  }

  // authentication successful so generate jwt and refresh tokens
  const jwtToken = generateJwtToken(user);

  // return basic details and tokens
  return {
    ...basicDetails(user),
    jwtToken,
  };
}

async function register(params) {
  // validate
  if (await User.findOne({ email: params.email })) throw "Email already registered!"
  if (await User.findOne({ contact: params.contact })) throw "Phone number already registered!"

  // create user object
  const user = new User(params);

  // hash password
  user.password = hash(params.password);

  // save user
  await user.save();
  return user
}

async function getAll() {
  const users = await User.find();
  return users.map((x) => basicDetails(x));
}

async function getById(id) {
  const user = await getUser(id);
  return basicDetails(user);
}

async function create(params) {
  // validate
  if (await User.findOne({ email: params.email })) {
    throw 'Email "' + params.email + '" is already registered';
  }

  const user = new User(params);

  // hash password
  user.password = hash(params.password);

  // save user
  await user.save();

  return basicDetails(user);
}

async function update(id, params) {
  const user = await getUser(id);

  // validate (if email was changed)
  if (
    params.email &&
    user.email !== params.email &&
    (await User.findOne({ email: params.email }))
  ) {
    throw 'Email "' + params.email + '" is already taken';
  }

  // hash password if it was entered
  if (params.password) {
    params.password = hash(params.password);
  }

  // copy params to user and save
  Object.assign(user, params);
  await user.save();

  return basicDetails(user);
}

async function _delete(id) {
  const user = await getUser(id);
  await user.remove();
}

// helper functions
async function getUser(id) {
  const user = await User.findById(id);
  if (!user) throw "user not found";
  return user;
}

function hash(password) {
  return bcrypt.hashSync(password, 10);
}

function generateJwtToken(user) {
  // create a jwt token containing the user id that expires in 15 minutes
  return jwt.sign({ sub: user.id, id: user.id }, config.secret, {
    expiresIn: "15m",
  });
}

function randomTokenString() {
  return crypto.randomBytes(40).toString("hex");
}

function basicDetails(user) {
  return {
    id,
    title,
    firstName,
    lastName,
    email,
    role,
    created,
    updated,
  } = user;
}

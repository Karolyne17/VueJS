const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// pas plus que 15 !!!
const SALT_ROUNDS = 10;

exports.hashPassword = (plainTextPassword) => {
  return bcrypt.hash(plainTextPassword, SALT_ROUNDS);
}

exports.comparePasswords = (plainTextPassword, hash) => {
    return bcrypt.compare(plainTextPassword, hash);
}

exports.createToken = (data) => {
  return jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
}

exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}
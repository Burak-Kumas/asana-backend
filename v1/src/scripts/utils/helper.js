const CryptoJS = require("crypto-js");
const JWT = require("jsonwebtoken");

const passwordToHash = (password) => {
  return CryptoJS.HmacSHA256(CryptoJS.HmacSHA1(password, "123123123").toString(),password).toString();
};
const generateAccessToken = (user) => {
  return JWT.sign({ name: user.email, ...user}, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: "1w" });
};
const generateRefreshToken = (user) => {
  return JWT.sign({ name: user.email, ...user }, process.env.REFRESH_TOKEN_SECRET_KEY);
};

module.exports = { passwordToHash, generateAccessToken, generateRefreshToken };

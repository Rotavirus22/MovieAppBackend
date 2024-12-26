const jsonwebtoken = require("jsonwebtoken");

const jwtManager = (user) => {
  const accessToken = jsonwebtoken.sign(
    {
      _id: user._id,
      name: user.fullName,
    },
    process.env.jwt_salt
  );
  return accessToken;
};

module.exports = jwtManager;
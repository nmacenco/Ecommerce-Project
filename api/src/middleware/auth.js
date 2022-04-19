//Here we going to do the auth middleware.
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { User } = require("../db");
require("dotenv").config();

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      return res.status(403).send({ errorMsg: "There is no token." });
    }
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({
      where: {
        id: payload.id,
        tokens: { [Op.contains]: [token] },
      },
    });
    if (!user) {
      return res.status(404).send({ errorMsg: "User not found." });
    }
    if(!user.isActive) {
      return res.status(401).send({errorMsg: 'User is not active at the moment.'})
    }
    req.userID = user.id;
    req.token = token;
    next();
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
  // axelito no rompas mas la rama development
};

const isAdmin = async (req, res, next) => {
  try {
    let user = await User.findOne({ where: { id: req.userID } });
    if (user.role !== "admin") {
      return res.status(401).send({ errorMsg: "Unauthorized content." });
    }
    next();
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

module.exports = {
  isLoggedIn,
  isAdmin,
};

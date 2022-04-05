const { User, Country } = require("../db");

//controllers that only admin can access.

const getUsers = async (req, res) => {
  try {
    let users = await User.findAll({
      include: [
        {
          model: Country,
          attributes: ["id", "name", "code"],
        },
      ],
    });
    if (!users.length) {
      res.status(400).send({ errorMsg: "There are no users." });
    } else {
      users = users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          surname: user.surname,
          password: user.password,
          email: user.email,
          billing_address: user.billing_address,
          default_shipping_address: user.default_shipping_address,
          role: user.role,
          isActive: user.isActive,
          country: user.Country.name,
          countryCode: user.Country.code,
          CountryId: user.Country.id,
          tokens: user.tokens,
        };
      });
      res.status(200).send({ successMsg: "Here are your users.", users });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

module.exports = {
  getUsers,
};

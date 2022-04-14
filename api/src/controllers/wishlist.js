const { User, Product } = require("../db");

const addToWishlist = async (req, res) => {
  try {
    const id = req.userID;
    const { productId } = req.params;
    if (!productId) {
      return res.status(400).send({ errorMsg: "Missing product id." });
    }
    const user = await User.findOne({
      where: { id },
      include: {
        model: Product,
        attributes: ["id"],
      },
    });
    if (!user) {
      return res.status(404).send({ errorMsg: "User not found." });
    }
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      return res.status(404).send({ errorMsg: "Product not found." });
    }
    let isProductInWishlist = user.Products.find(
      (product) => product.dataValues.id == productId
    );
    if (isProductInWishlist) {
      return res
        .status(404)
        .send({ errorMsg: "Product is already in wishlist." });
    }
    await user.addProduct(product);
    res
      .status(200)
      .send({ successMsg: "Product successfully added to wishlist." });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const id = req.userID;
    const { productId } = req.params;
    if (!productId) {
      return res.status(400).send({ errorMsg: "Missing product id." });
    }
    const user = await User.findOne({
      where: { id },
      include: {
        model: Product,
        attributes: ["id"],
      },
    });
    if (!user) {
      return res.status(404).send({ errorMsg: "User not found." });
    }
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      return res.status(404).send({ errorMsg: "Product not found." });
    }
    let isProductInWishlist = user.Products.find(
      (product) => product.dataValues.id == productId
    );
    if (!isProductInWishlist) {
      return res
        .status(404)
        .send({ errorMsg: "Product not found in wishlist."});
    }
    await user.removeProduct(product);
    res
      .status(200)
      .send({ successMsg: "Product successfully deleted from wishlist." });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const getWishlist = async (req, res) => {
  try {
    const id = req.userID;
    const user = await User.findOne({
      where: { id },
      include: {
        model: Product,
        attributes: ["name", "id", "image", "stock", "price"],
      },
    });
    if (!user) {
      return res.status(404).send({ errorMsg: "User not found." });
    }
    const products = user.Products.map((product) => {
      return {
        name: product.name,
        id: product.id,
        price: product.price,
        image: product.image,
        stock: product.stock,
      };
    });
    res.status(200).send({ successMsg: "Your wishlist.", data: products });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
};

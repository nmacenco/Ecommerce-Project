const e = require("express");
const {
  User,
  Product,
  Brand,
  Category,
  Subcategory,
  Question,
  Review,
  conn,
} = require("../db");

const createProduct = async (req, res) => {
  try {
    let {
      name,
      price,
      description,
      image,
      weight,
      stock,
      soldCount,
      SubcategoryId,
      BrandId,
    } = req.body;
    Number(price)
    Number(weight)
    Number(SubcategoryId)
    Number(BrandId)
    Number(stock)
    Number(soldCount)
    if (
      !name ||
      !SubcategoryId ||
      !BrandId ||
      !image ||
      !price ||
      !description ||
      !weight ||
      !stock
    ) {
      res.status(402).send({ errorMsg: "Missing data." });
    } else {
      let [newProduct, created] = await Product.findOrCreate({
        where: {
          name,
          price,
          description,
          image,
          weight,
          stock,
          soldCount,
          SubcategoryId,
          BrandId,
        },
      });
      created
        ? res.status(201).json({
            successMsg: "The Product has been created.",
            data: newProduct,
          })
        : res.status(401).json({ errorMsg: "Product already exists." });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    let {
      name,
      description,
      price,
      image,
      weight,
      stock,
      soldCount,
      BrandId,
      SubcategoryId,
    } = req.body;
    if (
      !name ||
      !description ||
      !price ||
      !image ||
      !weight ||
      !stock ||
      !soldCount ||
      !BrandId ||
      !SubcategoryId ||
      !id
    ) {
      res.status(400).send({ errorMsg: "Missing data." });
    } else {
      let productToUpdate = await Product.findOne({
        where: {
          id,
        },
      });
      if (!productToUpdate) {
        res.status(404).send({ errorMsg: "Product not found." });
      } else {
        let productUpdated = await productToUpdate.update({
          name,
          price,
          description,
          image,
          weight,
          stock,
          soldCount,
          BrandId,
          SubcategoryId,
        });
        res.status(200).send({
          successMsg: "Product successfully updated.",
          data: productUpdated,
        });
      }
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send({ errorMsg: "Missing data." });
    } else {
      let singleProduct = await Product.findOne({
        where: {
          id,
        },
        include: [
          {
            model: Brand,
            attributes: ["name"],
          },
          {
            model: Subcategory,
            attributes: ["name"],
            include: [
              {
                model: Category,
                attributes: ["name", "id"],
              },
            ],
          },
        ],
      });
      if (!singleProduct) {
        res.status(404).send({ errorMsg: "Product not found." });
      } else {
        singleProduct = {
          id: singleProduct.id,
          name: singleProduct.name,
          image: singleProduct.image,
          price: singleProduct.price,
          description: singleProduct.description,
          weight: singleProduct.weight,
          stock: singleProduct.stock,
          soldCount: singleProduct.soldCount,
          BrandId: singleProduct.BrandId,
          brand: singleProduct.Brand.name,
          SubcategoryId: singleProduct.SubcategoryId,
          subcategory: singleProduct.Subcategory.name,
          CategoryId: singleProduct.Subcategory.Category.id,
          category: singleProduct.Subcategory.Category.name,
        };
        res
          .status(200)
          .send({ successMsg: "Here is your product.", data: singleProduct });
      }
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error });
  }
};

const getProducts = async (req, res) => {
  try {
    let dataProduct = await Product.findAll({
      include: [
        {
          model: Brand,
          attributes: ["name"],
        },
        {
          model: Subcategory,
          attributes: ["name"],
          include: [
            {
              model: Category,
              attributes: ["name", "id"],
            },
          ],
        },
      ],
    });
    if (!dataProduct) {
      res.status(404).send({ errorMsg: "There are no products available." });
    } else {
      dataProduct = dataProduct.map((product) => {
        return {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          description: product.description,
          weight: product.weight,
          stock: product.stock,
          soldCount: product.soldCount,
          BrandId: product.BrandId,
          brand: product.Brand.name,
          SubcategoryId: product.SubcategoryId,
          subcategory: product.Subcategory.name,
          CategoryId: product.Subcategory.Category.id,
          category: product.Subcategory.Category.name,
        };
      });
      res
        .status(200)
        .send({ successMsg: "Here are your products.", data: dataProduct });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error});
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    Number(id)
    if (!id) {
      res.status(400).send({ errorMsg: "Missing data." });
    } else {
      let deletedProduct = await Product.destroy({
        where: {
          id,
        },
      });
      res.status(200).send({
        successMsg: "Product deleted in Database",
        data: `Product id: ${deletedProduct}`,
      });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
};

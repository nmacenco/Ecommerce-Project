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

const createProduct = async (req, res, next) => {
  try {
    let { subcategory_id,
      brand_id,
      name,
      image,
      price,
      description,
      weight,
      stock,
      soldCount } = req.body;

    if (!name || subcategory_id || brand_id || name || image || price || description || weight || stock || soldCount) {

      res.status(400).json({ errorMsg: "Information isn't enough to create the product" });

    } else {
      let productCreated = await Product.create({
        subcategory_id,
        brand_id,
        name,
        image,
        price,
        description,
        weight,
        stock,
        soldCount
      });
      productCreated
        ? res.status(201).json({ successMsg: "The Product has been created", data: productCreated })
        : res.status(404).json({ errorMsg: "The Product can not be created" });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    let {
      subcategory_id,
      brand_id,
      name,
      image,
      price,
      description,
      weight,
      stock,
      soldCount } = req.body;

    let productUpdated = await Product.update(
      {
        subcategory_id: subcategory_id,
        brand_id: brand_id,
        name: name,
        image: image,
        price: price,
        description: description,
        weight: weight,
        stock: stock,
        soldCount: soldCount
      },
      { where: { id: id } }
    );
    productUpdated
      ? res.status(201).json({ successMsg: "The Product has been Updated", data: productUpdated })
      : res.status(404).json({ errorMsg: "The Product can not be created" });

  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const getSingleProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    let productSingle = await Product.findOne({
      attributes: ['id', 'name', 'image', 'price', 'description', 'weight',
        'stock', 'soldCount', 'BrandId', 'SubcategoryId'],
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
              attributes: ["name"],
            }
          ]
        },
      ],
      where: {
        id,
      },
    });

    productSingle
      ? res.status(201).json({ successMsg: "Data found in Database", data: productSingle })
      : res.status(404).send({ errorMsg: "The product doesn't found" });
  }
  catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }

};

const getProducts = async (req, res, next) => {
  try {
    let dataProduct = await Product.findAll({
      attributes: ['id', 'name', 'image', 'price', 'description', 'weight',
        'stock', 'soldCount', 'BrandId', 'SubcategoryId'],
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
              attributes: ["name"],
            }
          ]
        },
      ],
    });

    dataProduct
      ? res.status(201).json({ successMsg: "Data found in Database", data: dataProduct })
      : res.status(404).send({ errorMsg: "The product doesn't found" });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const deleteProduct = async (req, res, next) => { 
try {
  const id = req.query.id;
  let deletedProduct = await Product.destroy({
    where: {
      id,
    },
  });

  deletedProduct
      ? res.status(201).json({ successMsg: "Product deleted in Database", data: deletedProduct })
      : res.status(404).send({ errorMsg: "Product doesn't found" });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }

};




module.exports = {
  createProduct,
  updateProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
};


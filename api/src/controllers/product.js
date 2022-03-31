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

    if (!name) {
      res.status(404).json({ errorMsg: "Information isn't enough to create the product" });
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
      productCreated ? res.status(200).json({ successMsg: "The Product has been created", data: productCreated })
        : res.status(404).json({ errorMsg: "The Product can not be created" });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const updateProduct = async (req, res, next) => {

  try {
    let {
      id,
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
    productUpdated ? res.status(200).json({ successMsg: "The Product has been Updated", data: productUpdated })
      : res.status(404).json({ errorMsg: "The Product can not be created" });

  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const getProducts = async (req, res, next) => {

  try {


    let dataProduct = await Product.findAll({
      include: {
        model: Subcategory,
        on: {
          col1: conn.where(conn.col("Product.category_id"), "=", conn.col("Subcategory.id"))},

    }});


    // let dataProduct = Product.findAll({
    //   include: [
    //     {
    //       model: Product,
    //       on: {
    //         col1: sequelize.where(sequelize.col("Product.category_id"), "=", sequelize.col("Subcategory.id")),
    //       },
    //       attributes: []
    //     },
    //     {
    //       model: Brand,
    //       on: {
    //         col2: sequelize.where(sequelize.col("Product.brand_id"), "=", sequelize.col("Brand.id"))
    //       },
    //       attributes: []
    //     }
    //   ]
    // });


      // let dataProduct = await Product.findAll({});



    dataProduct ? res.status(200).json({ successMsg: "", data: dataProduct }) :
      res.status(404).send({ errorMsg: "The product doesn't found" });
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }

};

const getSingleProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    let productSingle = await Product.findOne({
      where: {
        id,
      },
    });
    productSingle
      ? res.status(200).json({ successMsg: "", data: productSingle })
      : res.status(404).send({ errorMsg: "The product doesn't found" });
  }
  catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }

};

const deleteProduct = (req, res, next) => { };

module.exports = {
  createProduct,
  updateProduct,
  getProducts,
  getSingleProduct,
  deleteProduct,
};



    // let dataProduct = await Product.findAll({
    //   include: {
    //     model: Brand,Subcategory,
    //     attributes: ["name"],
    //     through: {
    //       attributes: [brand_id,subcategoy_id],
    //     },
    //   },
    // });

    // let dataProduct_1 = await Product.findAll({
    //   include: [
    //     { model: Brand, attributes: ['name'] },
    //     { model: Subcategory, attributes: ['name'] },
    //     { model: Category, attributes: ['name'] },
    //   ],
    //   where: {
    //     Product.category_id: Subcategory.id,
    //     Product.brand_id: Brand.id

    //   }
    // });

    // Post.findAll({
    //   where: {
    //     authorId: 12,
    //     status: 'active'
    //   }
    // });
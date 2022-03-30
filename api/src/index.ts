import  {
  Brand,
  Category,
  Country,
  Order,
  Order_Detail,
  Product,
  Question,
  Review,
  Subcategory,
  User,
  sequelize
}  from './db/db';


import server from './server/server';

Product.belongsToMany(Category, { through: 'product_category' });
Category.belongsToMany(Product, { through: 'product_category' });

// Product.associate = function (models) {
//     Product.belongsToMany(models.User, {
//         as: 'users' ,
//         through : 'products_users',
//         foreignKey : 'id_product' ,
//         otherKey : 'id_user',
//         timestamps : false 
//     }),

  Brand.sync({ force: true })
  .then(() => {})
  .catch((error: any) => {
    console.log(error);
  });
 
Category.sync({ force: true })
  .then(() => {})
  .catch((error: any) => {
    console.log(error);
  });

Country.sync({ force: true })
  .then(() => {})
  .catch((error: any) => {
    console.log(error);
  });

Order.sync({ force: true })
  .then(() => {})
  .catch((error: any) => {
    console.log(error);
  });

Order_Detail.sync({ force: true })
  .then(() => {})
  .catch((error: any) => {
    console.log(error);
  });

Product.sync({ force: true })
  .then(() => {})
  .catch((error: any) => {
    console.log(error);
  });

Question.sync({ force: true })
  .then(() => {})
  .catch((error: any) => {
    console.log(error);
  });

Review.sync({ force: true })
  .then(() => {})
  .catch((error: any) => {
    console.log(error);
  });

  Subcategory.sync({ force: true })
  .then(() => {})
  .catch((error: any) => {
    console.log(error);
  });


User.sync({ force: true })
  .then(() => {})
  .catch((error: any) => {
    console.log(error);
  });

  // Category.belongsToMany(Product, { through: 'dog_temperament' });
  // Product.belongsToMany(Category, { through: 'dog_temperament' });

  User.hasMany(sequelize.models.Order, {})

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`); // eslint-disable-line no-console
});



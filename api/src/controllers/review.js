const { Review, User } = require('../db');
const { fn, col } = require('sequelize');

const createReview = async (req, res) => {
  try {
    let { ProductId, UserId, title, description, stars } = req.body;
    if (!ProductId || !UserId || !title || !description) {
      res.status(402).send({ errorMsg: 'Missing data.' });
    } else {
      const reviewUpdate = await Review.destroy({
        where: {
          UserId: Number(UserId),
          ProductId: Number(ProductId),
        },
      });

      let newReview = await Review.create({
        ProductId: ProductId,
        UserId: UserId,
        title: title,
        description: description,
        stars: stars,
      });
      newReview
        ? res.status(201).json({
            successMsg: 'The Review has been added to the product.',
            data: newReview,
          })
        : res
            .status(401)
            .json({ errorMsg: 'An error happend adding the question' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ errorMsg: error.message });
  }
};

const getReviews = async (req, res) => {
  try {
    let dataReviews = await Review.findAll({
      attributes: [
        'id',
        'ProductId',
        'UserId',
        'title',
        'description',
        'stars',
      ],
      include: [
        {
          model: User,
          attributes: [
            [fn('CONCAT', col('name'), ' ', col('surname')), 'fullname'],
          ],
        },
      ],
    });
    if (!dataReviews) {
      res.status(404).send({ errorMsg: 'There are no reviews available.' });
    } else {
      res
        .status(200)
        .send({ successMsg: 'Here are your reviews.', data: dataReviews });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const getSingleReview = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send({ errorMsg: 'Missing data.' });
    } else {
      let singleReview = await Review.findOne({
        attributes: [
          'id',
          'ProductId',
          'UserId',
          'title',
          'description',
          'stars',
        ],
        include: [
          {
            model: User,
            attributes: [
              [fn('CONCAT', col('name'), ' ', col('surname')), 'fullname'],
            ],
          },
        ],

        where: {
          id,
        },
      });
      if (!singleReview) {
        res.status(404).send({ errorMsg: 'Review not found.' });
      } else {
        res
          .status(200)
          .send({ successMsg: 'Here is your Review.', data: singleReview });
      }
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const updateReview = async (req, res) => {
  let { id, ProductId, UserId, title, description, stars } = req.body;
  try {
    let reviewToUpdate = await Review.findOne({
      where: {
        id: id,
        ProductId: ProductId,
      },
    });
    if (!reviewToUpdate) {
      res.status(404).send({ errorMsg: 'Review not found.' });
    } else {
      let updatedReview = await reviewToUpdate.update({
        title: title,
        description: description,
        stars: stars,
      });

      res.status(200).send({
        successMsg: 'Review successfully updated.',
        data: updatedReview,
      });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const id = req.params.id;
    Number(id);
    if (!id) {
      res.status(400).send({ errorMsg: 'Missing data.' });
    } else {
      let deletedReview = await Review.destroy({
        where: {
          id,
        },
      });
      deletedReview
        ? res.status(200).send({
            successMsg: 'Review has been deleted in Database',
            data: `Review id: ${deletedReview}`,
          })
        : res
            .status(401)
            .json({ errorMsg: "Review hasn't exists in the database." });
    }
  } catch (error) {
    res.status(500).send({ errorMsg: error.message });
  }
};

module.exports = {
  createReview,
  updateReview,
  getReviews,
  getSingleReview,
  deleteReview,
};

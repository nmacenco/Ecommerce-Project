const express = require("express");
const {
  createReview,
  updateReview,
  getReviews,
  getSingleReview,
  deleteReview,
} = require("../controllers/review.js");

//Creating routes and adding the controllers.

const reviewsRouter = express.Router();

reviewsRouter.get("/reviews", getReviews);
reviewsRouter.get("/reviews/:id", getSingleReview);

reviewsRouter.post("/reviews", createReview);
reviewsRouter.put("/reviews", updateReview);
reviewsRouter.delete("/reviews/:id", deleteReview);

module.exports = reviewsRouter;

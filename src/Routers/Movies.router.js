const express = require("express");
const router = express.Router();
const moviesController = require("../Controllers/moviesController")
const reviewController = require("../Controllers/reviewController")
const authenticateToken = require('../Middlewares/authAuthentication')

router.get("/",authenticateToken , moviesController.getMovies)
router.get("/:id", authenticateToken , moviesController.getMovieById)
router.post("/" , authenticateToken, moviesController.postMovies)
router.put("/:id" , authenticateToken , moviesController.putMovies)
router.delete("/:id" , authenticateToken , moviesController.deleteMovies)
//review Controllers
router.post("/:id/reviews", authenticateToken , reviewController.postReviews)
router.put("/:id/reviews/:reviewId" , authenticateToken , reviewController.updateReviews)
router.delete("/:id/reviews/:reviewId" , authenticateToken , reviewController.deleteReviews)
router.get("/:id/reviews" , authenticateToken , reviewController.getReviews)
router.get("/:id/averageRating" , authenticateToken, reviewController.getAverageRatings) 
module.exports = router 
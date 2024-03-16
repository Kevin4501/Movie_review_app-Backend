const Reviews = require("../Models/Ratings.model");
const Movies = require("../Models/Movies.model");
const postReviews = async (movieId, userId, rating, reviewText) => {
  try {
    const newReview = await Reviews.create({
      movieId,
      userId,
      rating,
      reviewText,
    });

    await newReview.save();
    await updateAverageRatings(movieId)
    return newReview;
  } catch (err) {
    throw err;
  }
};
const updateReview = async (movieId, reviewId, userId, updateData) => {
  // Find review
  try {
    console.log(updateData);
    const updatedreview = await Reviews.findByIdAndUpdate(
      { _id: reviewId, userId: userId, movieId: movieId },
      { $set: updateData },
      { new: true }
    );
    console.log(updatedreview);
    await updateAverageRatings(movieId)
    return updatedreview;
  } catch (err) {
    throw err;
  }
};
const deleteReview = async (id, userId) => {
  try {
    const deleteRev = await Reviews.findByIdAndDelete({
      _id: id,
      userId: userId,
    });
    await updateAverageRatings(movieId)
    return deleteRev;
  } catch (err) {
    throw err;
  }
};
const getReviews = async (id) => {
  try {
    const reviews = await Reviews.find({ movieId: id });
    console.log(reviews);
    return reviews;
  } catch (err) {
    throw err;
  }
};
const getAverageRatings = async (movieId) => {
  // Get average rating for a movie
  const movie = await Movies.findById(movieId);
  console.log(movie, " from getAverageRatings");

  const reviews = await Reviews.find({ movieId });
  console.log(reviews, " from getAvegreage");
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  //console.log("totalRating" , totalRating)
  const averageRating = totalRating / reviews.length;
  console.log("averageRating", averageRating);

  const updatedData = await Movies.findByIdAndUpdate(
    { _id: movieId },
    { $set: {averageRating : averageRating} },
    { new: true }
  );

  console.log(updatedData)
  return updatedData.averageRating;
};
async function updateAverageRatings(movieId){
    const movie = await Movies.findById(movieId);
  console.log(movie, " from getAverageRatings");

  const reviews = await Reviews.find({ movieId });
  console.log(reviews, " from getAvegreage");
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  //console.log("totalRating" , totalRating)
  const averageRating = totalRating / reviews.length;
  console.log("averageRating", averageRating);

  const updatedData = await Movies.findByIdAndUpdate(
    { _id: movieId },
    { $set: {averageRating : averageRating} },
    { new: true }
  );

}

module.exports = {
  postReviews,
  updateReview,
  deleteReview,
  getReviews,
  getAverageRatings,
};

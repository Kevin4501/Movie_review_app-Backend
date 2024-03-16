const mongoose = require('mongoose');

const RatingReviewSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming there is a User model for authentication
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    reviewText: {
        type: String,
        required: true
    }}, { timestamps: true }); // Include timestamps for creation and update

const RatingReview=  mongoose.model('RatingReview', RatingReviewSchema);
module.exports = RatingReview
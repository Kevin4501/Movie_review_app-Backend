const Review = require("../Models/Ratings.model")
const reviewService = require("../Services/reviewServices")
const postReviews = async(req,res)=>{


    try {
        const { id } = req.params;
        const { rating, reviewText } = req.body;
        const userId = req.user.id; // Assuming authentication middleware sets user id

        const review = await reviewService.postReviews(id, userId, rating, reviewText);
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({"error":error});
    }
 
}

const updateReviews = async(req , res) =>{
    try{

        const {movieId , reviewId } = req.params;
        console.log(req.params)
        const updateData= req.body;
        const userId = req.user.id
        const review = await reviewService.updateReview(movieId ,reviewId, userId, updateData);
        res.status(201).json(review);
    }
    catch(err){
        res.status(500).json({"err":err})
    }
}
const deleteReviews = async(req ,res)=>{
try{

 const id = req.params.id
 const reviewId = req.params.reviewId
 const userId = req.user.id
 const deleteReview  = await reviewService.deleteReview(reviewId , userId)
 if(!deleteReview){
    res.status(404).json("Movies not found")
}
res.status(200).send()
}
catch(err){
    res.status(500).json({"err" : err})
}
}
const getReviews = async(req , res)=>{
    try{
        const id = req.params.id
        const userId = req.user.id
    const getReview = await reviewService.getReviews(id) 
    if(!getReview){
        res.status(404).json("Reviews not found")
    }
    res.status(200).json(getReview)
    }

    catch(err){
        res.status(500).json({"err" : err})
    }

}
const getAverageRatings = async(req,res)=>{
   try {const id = req.params.id
    const avergeRev = await reviewService.getAverageRatings(id)
    res.status(200).json({avergeRev})
   }
   catch(err){
    res.status(500).json({"err" : err})
   }
}

module.exports = {postReviews , updateReviews , deleteReviews ,getReviews, getAverageRatings}
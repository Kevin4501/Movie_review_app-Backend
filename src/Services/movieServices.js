const mongoose = require("mongoose")
const Movies = require("../Models/Movies.model")

const postMovies = async (moviesData)=>{
    try{
        //using the data provided create the database
        const newMovie = await Movies.create(moviesData)
        return newMovie
    }
    catch(err){
        throw err
    }

}
  
const putMovies = async (movieid , userId ,updateData)=>{
try{
    //using the id provided , update the movie
const updated = await Movies.findByIdAndUpdate(
    { _id : movieid , userId : userId},
    //$set used to update the data $set<param : needtoUpdate>
    {$set: updateData},
    {new: true}
         
)
return updated
}
catch(err){
    throw err
}
}

  
const deleteMovies = async (movieid , userId)=>{
    try{
        const deletee = await Movies.findByIdAndDelete({_id:movieid , userId : userId})
        return deletee
    }
    catch(err){
        throw err
    }

}
const getMovies = async(allQueries)=>{
   try {
    let query = {}
    if(allQueries.genre){
        query.genre = allQueries.genre
    }
    if (allQueries.releaseYear) {
        query.releaseYear = allQueries.releaseYear;
      }
      if (allQueries.director) {
        query.director = new RegExp(allQueries.director, 'i'); // Case-insensitive search
      }
  
      const movies = await Movies.find(query);
      return movies;
    }
      catch(err){
        throw err
      }
}

const getMovieById = async(movieId )=>{
try{
const gotMoviesById = await Movies.findOne({ _id : movieId})
return gotMoviesById
}
catch(err){
    throw err
}
}
module.exports = {postMovies , putMovies , deleteMovies , getMovies , getMovieById}
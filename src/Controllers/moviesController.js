const movieServices = require("../Services/movieServices")


const postMovies = async(req , res)=>{
    
  try{
    //destructor from the request body
    const {title , director , genre , releaseYear , description} = req.body;
    //send the data to the services
    const movies = await movieServices.postMovies({title , director , genre , releaseYear , description})
   res.status(201).json({
    message : "Movie posted successfully",
    moviesID : movies._id
   })
  }
  catch(err){
    res.status(500).json({"err" : err})
  }
}
const putMovies = async(req,res)=>{
    try{
        //get the :id using req.params
        const id = req.params.id;
        const userId = req.user.id
        const updateData = req.body
       console.log(userId)
        const updateMovie = await movieServices.putMovies(id , userId , updateData)
        if(!updateMovie){
           res.status(404).json("Movie not found")
        }
        res.status(200).json(
            
            updateData
        )
    }
    catch(err){
        res.status(500).json({"err" : err})
    }
}
const deleteMovies = async(req ,res)=>{
    try{
        const id = req.params.id;
        const userId = req.user.id;
        const deleted = await movieServices.deleteMovies(id , userId)
        if(!deleted){
            res.status(404).json("Movies not found")
        }
        res.status(200).send()
    }
    catch(err){
        res.status(500).json({"err" : err})
    }
}

const getMovies = async(req , res)=>{
    //pushing all the queries into the objects
    const allQueries = {
        genre: req.query.genre,
        releaseYear: req.query.releaseYear,
        director: req.query.director,
      };
    try{
        const gotMovies = await movieServices.getMovies(allQueries);
        res.json(gotMovies);
    }
    catch(err){
        res.status(500).json({"err":err})
    }
}

const getMovieById = async(req , res)=>{
    //need to send the id , userId  to the service layer
  try{
    const {id} = req.params;
    const userId = req.user.id;
    const moviesId = await movieServices.getMovieById(id  , userId)
    if(!moviesId){
        res.status(404).json("Movies not found")
    }
    res.status(200).json(moviesId)
  }
  catch(err){
    res.status(500).json({"err" : err})
  }

}
module.exports = {postMovies , putMovies ,deleteMovies , getMovies , getMovieById }
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
//title, director, genre, releaseYear, and description.

const movieSchema = new mongoose.Schema(
    {
title : {
    type:String,
    required:true
},
director : {
    type: String,
    required: true
},
genre: {
    type: String,
    required: true
},
releaseYear: {
    type: Number,
    required: true
},
description: {
    type: String
},
averageRating: {
    type: Number,
    default: 0
}
}
)
const Movies = mongoose.model('Movie', movieSchema);
module.exports = Movies
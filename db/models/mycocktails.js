import mongoose from "mongoose";

const { Schema } = mongoose;

const mycocktailsSchema = new Schema({
    strDrink: {type:String, required:true},
    strDrinkThumb: 
    {data:Buffer,
    contentType:String},
    userId: {type:String},
    ingredients: {type:String},
    method: {type:String},
    });

    const Mycocktail = mongoose.models.Mycocktail || mongoose.model("Mycocktail", mycocktailsSchema);
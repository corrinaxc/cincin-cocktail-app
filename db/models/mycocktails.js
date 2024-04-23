import mongoose from "mongoose";

const { Schema } = mongoose;

const mycocktailSchema = new Schema({
    strDrink: {type:String, required:true},
    strDrinkThumb: {type:String},
    userId: {type:String},
    ingredients: {type:Array},
    method: {type:String},
    });

    const MyCocktail = mongoose.models.MyCocktail || mongoose.model("MyCocktail", mycocktailSchema);

    export default MyCocktail;
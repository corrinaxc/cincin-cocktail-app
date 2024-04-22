import mongoose from "mongoose";

const { Schema } = mongoose;

const favouriteSchema = new Schema({
    idDrink: {type: String},
    strDrink: {type:String, required:true},
    strDrinkThumb: {type:String},
    userId: {type:String},
});

const Favourite = mongoose.models.Favourite || mongoose.model("Favourite", favouriteSchema);

export default Favourite;
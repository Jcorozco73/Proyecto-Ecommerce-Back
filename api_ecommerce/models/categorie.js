import mongoose from "mongoose";
import { Schema } from "mongoose";


const CategorieSchema = new Schema({
    title:{type: String, maxlenght: 250, require: true},
    imagen:{type: String, maxlenght: 250, require: true},
    state: {type: Number,maxlenght: 2, default: 1} //1 es activo,2 es desactivo
    

}, {            
    timestamps: true
    
});

const Categorie = mongoose.model('categorie', CategorieSchema);

export default Categorie

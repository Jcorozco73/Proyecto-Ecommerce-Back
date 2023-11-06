import mongoose from "mongoose";
import  {Schema}  from 'mongoose';


const variedadSchema = new Schema({
    product:{
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true
    },  
    valor:{
        type: String,
        required: true,
    },
    stock:{
        type: Number,
        required: true,
       
    },

    },{
    timestamps: true,
    })

const Variedad = mongoose.model('variedad', variedadSchema)

export default Variedad 

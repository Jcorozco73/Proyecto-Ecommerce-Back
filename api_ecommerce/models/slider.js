import mongoose from "mongoose";
import  {Schema}  from "mongoose";


const SliderSchema = new Schema({
    title:{type: String, maxlenght: 250, require: true},
    imagen:{type: String, maxlenght: 250, require: true},
    link:{type: String, maxlenght: 250, require: true},
    state: {type: Number,maxlenght: 2, default: 1} //1 es activo,2 es desactivo
    

}, {            
    timestamps: true
    
});

const Slider = mongoose.model('sliders', SliderSchema);

export default Slider

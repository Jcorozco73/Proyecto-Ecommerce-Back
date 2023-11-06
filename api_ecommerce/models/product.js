import mongoose from  'mongoose' 
import {Schema} from 'mongoose';

const productSchema = new Schema({
    title: { type: String, required: [true, 'Name is required'],maxlength: 250 },
    slug:{ type: String, required: true, maxlength: 1000},
    sku:{ type: String, required: true},
    categorie: {type: Schema.Types.ObjectId,ref: "categorie", required: true},
    price: {type: Number, required: true,},
    price_USD:{type: Number, required: true},
    portada:{type: String, required: true},
    galerias:[{type: Object, required:false}],
    state:{type: Number, default: 1}, //es en prueba, 2 activado, 3 anulado
    stock:{type: Number, required: true, default: 0},
    description:{type: String, required: false},
    resumen:{type: String, required: true, maxlength: 250},
    tags: {type: String, required:true},
    type_inventario:{ type: Number, default: 1}

    },{
    timestamps: true,   
    
    
})

const Product = mongoose.model('product', productSchema);

export default Product;
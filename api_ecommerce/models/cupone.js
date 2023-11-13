import mongoose,{Schema} from 'mongoose'

const CuponeSchema = new Schema({
    code: {
        type: String,
        maxlength: 50,
        required: true,
       
    },
    type_discount: {
        type: Number,
        default:1, // 1 por porcentaje 2 por moneda
        required: true
    },
    discount: {
        type: Number,
        required: true
    },  
    type_count: {
        type: Number,
        default:1, // 1 ilimiatdo 2 limitado
        required: true
    },
    num_use: {
        type: Number,
        required:false
    },
    state:{
        type: Number,
        required: false,
        default: 1 //1 es activo

    },
    type_segment:{
        type: Number,
        default:1, // 1 productos 2 categorias
    },
    products:[{type: Object}],
    categories:[{type: Object}]
    
  }, {

    timestamps: true  
})

const Cupone = mongoose.model('cupone', CuponeSchema);
export default Cupone;
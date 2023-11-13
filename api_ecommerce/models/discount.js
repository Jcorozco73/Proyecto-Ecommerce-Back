import mongoose,{Schema} from 'mongoose'

const discountSchema = new Schema({
    type_campaing: {
        type: Number,
        default:1, // 1 campaña normal 2 venta flash
        required: true

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

    start_date: {
        type: Date,
        required: true
   
    },
    end_date: {
        type: Date,
        required: true
    },
    start_date_num: {
        type: Number,
        required: true
   
    },
    end_date_num: {
        type: Number,
        required: true
    },
    type_segment: {
        type: Number,
        default:1, // 1 productos 2 categorias
        
    },
    state:{
        type: Number,
        default: 1 //1 es activo
    },
    products: [{
        type: Object,
        required: false

    }],
    categories: [{
        type: Object,
        required: false
    }]

    },{
        timestamps: true

    })

const Discount = mongoose.model('discount', discountSchema);
export default Discount;





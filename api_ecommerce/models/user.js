import mongoose from "mongoose";
import { Schema } from "mongoose";


const userSchema = new Schema({
    name: {type: String, maxlength: 250, required:true},
    surname: {type: String, maxlength: 250, required: false},
    email: {type: String, maxlength: 250, required:true, unique:true},
    password: {type: String, maxlength: 250, required: true},
    role: {type: String, maxlength: 250, required: true},
    avatar: {type: String, maxlength: 250, required: false},
    state: {type: Number, default: 1}, //1 es activo,2 es desactivo
    phone: {type: String, maxlength: 250, required: false},
    birthday: {type: Date, maxlength: 20, required: false}

}, {            
    timestamps: true
    
});

const User = mongoose.model('user', userSchema);

export default User

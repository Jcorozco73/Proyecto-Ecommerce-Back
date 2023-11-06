import {Router}  from "express";

import User from '../models/user.js'
import Categorie from "../models/categorie.js";
import Product from "../models/product.js";
import Slider from "../models/slider.js";

const router = Router();

router.use('/user', User)
router.use('/categories', Categorie)
router.use('/products', Product)
router.use('/sliders', Slider)

export default router
import {Router}  from "express";

import User from './user.js'
import Categorie from "./categorie.js";
import Product from "./product.js";
import Slider from "./slider.js";
import Cupone from "./Cupone.js"
import Discount from "./discount.js"
import Home from "./Home.js"


const router = Router();

router.use('/user', User)
router.use('/categories', Categorie)
router.use('/products', Product)
router.use('/sliders', Slider)
router.use('/cupones', Cupone)
router.use('/discounts', Discount)
router.use('/home', Home)

export default router
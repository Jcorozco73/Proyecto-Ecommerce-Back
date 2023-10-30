import {Router}  from "express";

import user from './user.js'
import Categorie from "../models/categorie.js";

const router = Router();

router.use('/user', user)
router.use('/categories', Categorie)

export default router
import { Router } from "express"
import homeController from '../controllers/home.controllers.js'
const router = Router()

//import multiparty from "connect-multiparty"

router.get('/list',homeController.list)
router.get('/landing-product/:slug',homeController.show_landing_product)


export default router   
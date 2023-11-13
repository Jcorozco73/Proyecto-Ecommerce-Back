import { Router } from "express"
import homeController from '../controllers/home.controllers.js'
const router = Router()

//import multiparty from "connect-multiparty"

router.get('/list',homeController.list)


export default router   
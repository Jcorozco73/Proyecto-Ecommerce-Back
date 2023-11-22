import {Router} from "express"
import controller from '../controllers/cart.controllers.js'
const router = Router()
import auth from "../middlewares/auth.js"
//import multiparty from "connect-multiparty"

router.get("/list", auth.verifyEcommerce, controller.list)
router.post("/register", auth.verifyEcommerce, controller.register)
router.put("/update", auth.verifyEcommerce, controller.update)
router.delete("/delete/:id", auth.verifyEcommerce, controller.delete)
router.post("/aplicar_cupon",auth.verifyEcommerce,controller.apllyCupon)



export default router
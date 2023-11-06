import {Router} from "express"
import productController from '../controllers/product.controllers.js'
const router = Router()
import auth from "../middlewares/auth.js"
import multiparty from "connect-multiparty"
import variedadControllers from "../controllers/variedad.controllers.js"

const multipartMiddleware = multiparty({uploadDir: './uploads/product'})

//http://localhost:5000/api/user/register

router.post('/register',[auth.verifyAdmin, multipartMiddleware], productController.register)

router.post('/register_imagen',[auth.verifyAdmin, multipartMiddleware], productController.register_imagen)
router.post('/remove_imagen',[auth.verifyAdmin, multipartMiddleware], productController.remove_imagen)

router.put('/update',[auth.verifyAdmin, multipartMiddleware], productController.update)
router.get('/list',auth.verifyAdmin, productController.list)
router.get('/list',auth.verifyAdmin, productController.list)
router.delete('/delete',auth.verifyAdmin, productController.remove)

router.get('/uploads/product/:img', productController.obtener_imagen)
router.get('/show:id', productController.show)

//Variedad
router.post('/register_variedad',[auth.verifyAdmin, multipartMiddleware], variedadControllers.register)
router.put('/update_variedad',[auth.verifyAdmin, multipartMiddleware], variedadControllers.update)
router.delete('/delete_variedad:id',[auth.verifyAdmin, multipartMiddleware], variedadControllers.delete)


export default router
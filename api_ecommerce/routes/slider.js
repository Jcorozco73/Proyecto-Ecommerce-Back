import {Router} from "express"
import sliderController from '../controllers/slider.controllers.js'
const router = Router()
import auth from "../middlewares/auth.js"
import multiparty from "connect-multiparty"

const multipartMiddleware = multiparty({uploadDir: './uploads/slider'})

//http://localhost:5000/api/user/register

router.post('/register',[auth.verifyAdmin, multipartMiddleware],sliderController.register)
router.put('/update',[auth.verifyAdmin, multipartMiddleware],sliderController.update)
router.get('/list',auth.verifyAdmin,sliderController.list)
router.get('/list',auth.verifyAdmin,sliderController.list)
router.delete('/delete',auth.verifyAdmin,sliderController.remove)

router.get('/uploads/slider/:img',auth.verifyAdmin,sliderController.obtener_imagen)


export default router
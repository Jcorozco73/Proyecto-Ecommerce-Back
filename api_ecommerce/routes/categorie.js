import {Router} from "express"
import controller from '../controllers/categorie.controllers.js'
const router = Router()
import auth from "../middlewares/auth.js"
import multiparty from "connect-multiparty"

const multipartMiddleware = multiparty({uploadDir: './uploads/categorie'})

//http://localhost:5000/api/user/register

router.post('/register',[auth.verifyAdmin, multipartMiddleware], controller.register)
router.put('/update',[auth.verifyAdmin, multipartMiddleware], controller.update)
router.get('/list',auth.verifyAdmin, controller.list)
router.get('/list',auth.verifyAdmin, controller.list)
router.delete('/delete',auth.verifyAdmin, controller.remove)



export default router
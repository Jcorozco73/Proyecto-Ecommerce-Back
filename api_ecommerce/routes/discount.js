import {Router} from "express"
import discountController from '../controllers/discount.controllers.js'
const router = Router()
import auth from "../middlewares/auth.js"
//import multiparty from "connect-multiparty"

router.post('/register',auth.verifyAdmin,discountController.register)
router.put('/update',auth.verifyAdmin,discountController.update)
router.get('/list',auth.verifyAdmin,discountController.list)
router.get('/config',auth.verifyAdmin,discountController.config)
router.get('/show',auth.verifyAdmin,discountController.show)
router.delete('/delete',auth.verifyAdmin,discountController.delete)


export default router

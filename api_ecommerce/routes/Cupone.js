import {Router} from "express"
import cuponeController from '../controllers/cupone.controllers.js'
const router = Router()
import auth from "../middlewares/auth.js"
//import multiparty from "connect-multiparty"

router.post('/register',auth.verifyAdmin,cuponeController.register)
router.put('/update',auth.verifyAdmin,cuponeController.update)
router.get('/list',auth.verifyAdmin,cuponeController.list)
router.get('/config',auth.verifyAdmin,cuponeController.config)
router.get('/show',auth.verifyAdmin,cuponeController.show)
router.delete('/delete',auth.verifyAdmin,cuponeController.delete)

export default router   
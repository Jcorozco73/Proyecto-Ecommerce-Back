import {Router} from "express"
import controller from '../controllers/user.controllers.js'
const router = Router()
import auth from "../middlewares/auth.js"

//http://localhost:5000/api/user/register

router.post('/register', controller.register)
router.put('/update', controller.update)
router.get('/list', controller.list)
//router.get('/list',auth.verifyAdmin, controller.list)
router.post('/login', controller.login)
router.delete('/delete', controller.remove)



export default router
    

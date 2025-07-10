import Router from "express"
import {verifyJwt} from '../middlewares/auth.middleware.js'
import {reportAnyProblem} from '../controllers/contactUs.controller.js'



const router = Router()

router.route('/contactus').post( verifyJwt ,  reportAnyProblem)

export default router
import { Router } from "express"
import {upload} from "../middlewares/multer.middleware.js"
import {verifyJwt} from '../middlewares/auth.middleware.js'

import { register , 
         login ,
         generateRefreshAccessToken
        } 
from "../controllers/user.controller.js"


const router = Router()

router.route('/register').post(upload.single('avatar') , register)
router.route('/login').post(login)
router.route('/new-tokens').post(generateRefreshAccessToken)

export default router
import { Router } from "express"
import {getLocationAndMEdiaAndCaption} from '../controllers/locatonAndMedia.controller.js'
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"


const router = Router()

router.route('/location-and-media').post(verifyJwt,
     upload.fields([
    { name: 'images', maxCount: 3 },
    { name: 'video', maxCount: 1 }
  ])
    ,getLocationAndMEdiaAndCaption)

export default router


import { getLocation } from "../controllers/location.controller.js";

import {Router} from "express"
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/get-location").post(verifyJwt , getLocation)

export default router
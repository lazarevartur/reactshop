import express from 'express'
import {authUser,regUser, userProfile} from '../controller/userController.js'
import protect from '../middleware/authMiddleware.js'
const router = express.Router()

router.route('/').post(regUser)
router.route('/login').post(authUser)
router.route('/profile').get(protect, userProfile)

export default router
import express from 'express'
import { getUser, loggedInUserData } from '../../controllers/userControllers/userController.js'


const router = express.Router()

router.get('/get-users', getUser)

router.get('/logged-in-user', loggedInUserData)

export default router
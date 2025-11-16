import express from 'express'
import { getUser } from '../../controllers/userControllers/userController.js'


const router = express.Router()

router.get('/get-users', getUser)

export default router
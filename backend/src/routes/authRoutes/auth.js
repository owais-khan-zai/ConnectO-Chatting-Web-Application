import express from "express"
const router = express.Router()
import { signUp, login, verifyEmail, resendOtp, forgotPassword,verifyForgotOtp, resetPassword, logout } from "../../controllers/authControllers/auth.js"


router.post('/signup', signUp)

router.post('/login', login)

router.post('/verify-email', verifyEmail)

router.post('/resend-otp', resendOtp)

router.post('/forgot-password', forgotPassword)

router.post('/verify-forgot-otp', verifyForgotOtp)

router.post('/reset-password', resetPassword)

router.get('/logout', logout)


export default router
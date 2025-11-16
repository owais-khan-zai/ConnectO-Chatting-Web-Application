import { responseErrorHandler, responseHandler } from "../../utils/responseHandler.js";
import { userModel } from "../../models/user_model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import crypto, { verify } from "crypto";
import {generateOTP} from '../../utils/emailCodeGenerator.js'
import { sendVerificationEmail } from "../../services/emailService.js";
import { userDataFilterFunction } from "../../utils/userDataFilterFunction.js";



export const signUp = async (req, res) =>{

    try {
        const {firstName, lastName, email, password} = req.body || {};

        if( !firstName || !lastName || !email || !password){
            return responseHandler(res, 400, false, "Required field missing")
        }

        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return responseHandler(res, 400, false, "Email already exists")
        }

        const hash = bcrypt.hashSync(password, 10);

        const user = await userModel.create({
            firstName,
            lastName,
            email,
            password: hash             
        })

        const tempToken = crypto.randomBytes(32).toString("hex")
        const tokenExpiry = Date.now() + 1000 * 60 * 15

        user.securityToken.token = tempToken
        user.securityToken.tokenExpiry = tokenExpiry
        
        const code = generateOTP()
        user.emailCode.code = code
        user.emailCode.codeExpiry = Date.now() + 1000 * 60 * 15

        await user.save()

        await sendVerificationEmail(user.email, "Email Verification",code, "verify", user.firstName)

        const userDetails = userDataFilterFunction(user)

        return responseHandler(res, 201, true, "Registration successfull! Verify your email Now", {userDetails , token: user.securityToken.token})

    } catch (error) {
        console.log("Error is: ", error)
        return responseErrorHandler(res)
    }
}

export const login = async (req, res) =>{
    try {
        const {email, password} = req.body || {}

        if(!email || !password){
            return responseHandler(res,400, false, "Required field missing")
        }
        
        const user = await userModel.findOne({email}).select("+password")

        if(!user){
            return responseHandler(res, 401, false, "Email or password is incorrect")
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return responseHandler(res, 401, false, "Email or password is incorrect");
        }

        if(user.isVerified == false){

            const tempToken = crypto.randomBytes(32).toString("hex")
            const tokenExpiry = Date.now() + 1000 * 60 * 15

            user.securityToken.token = tempToken
            user.securityToken.tokenExpiry = tokenExpiry
            
            const code = generateOTP()
            user.emailCode.code = code
            user.emailCode.codeExpiry = Date.now() + 1000 * 60 * 15

            await user.save()

            const userDetails = userDataFilterFunction(user)

            return responseHandler(res, 200, true, "Verify your email Now", {userDetails, token: tempToken});
        } else {
            const token = jwt.sign({id: user.id, email: user.email, fullName : user.firstName+ " " +user.lastName }, process.env.JWT_SECRET, {expiresIn: "1w"})
            res.cookie('token', token, {maxAge: 1000 * 60 * 60 * 24 * 7,})
            return responseHandler(res, 200, true, "Login successfull", {user});
        }

    } catch (error) {
        console.log("Error is: ", error)
        return responseErrorHandler(res)
    }
}


export const verifyEmail = async (req, res) =>{
    try {
        const {token , code } = req.body || {}
        if(!token || !code) {
            return responseHandler(res, 400,false,"Invalid payload")
        }

        const user = await userModel.findOne({"securityToken.token": token}).select("+securityToken.token +securityToken.tokenExpiry +emailCode.code +emailCode.codeExpiry");
        if(!user) {
            return responseHandler(res, 400, false, "Invalid or expire token")
        }

        if(Date.now() > user.securityToken.tokenExpiry){
            return responseHandler(res, 400 , false, "Token expire! Login again to request a new token")
        }

        if(String(user.emailCode.code) !== String(code)){
            console.log("user db:", user.emailCode.code)
            console.log("code: ", code)
            return responseHandler(res, 400, false, "Invalid verification code")
        }

        if(Date.now() > user.emailCode.codeExpiry){
            return responseHandler(res, 400, false, "Code expire. Resend new code request")
        }

        user.isVerified = true

        user.securityToken.token = null;
        user.securityToken.tokenExpiry = null;
        user.emailCode.code = null;
        user.emailCode.codeExpiry = null;

        await user.save();

        const jwtToken = jwt.sign({id: user.id, email: user.email, fullName : user.firstName+ " " +user.lastName }, process.env.JWT_SECRET, {expiresIn: "1w"})
        res.cookie('token', jwtToken, {maxAge: 1000 * 60 * 60 * 24 * 7,})

        const userDetails = userDataFilterFunction(user)

        return responseHandler(res, 200 , true, "Email verified successfull", {userDetails})
    } catch (error) {
        return responseErrorHandler(res)
    }
}

export const resendOtp = async (req, res) =>{
    try {
        const {token, type} = req.body || {}

        if(!token || !type){
            return responseHandler(res, 400 , false, "Token is required")
        }

        const user = await userModel.findOne({"securityToken.token": token});

        if(!user){
            return responseHandler(res, 404, false, "Invalid or expire token")
        }

        if(Date.now() >  user.securityToken.tokenExpiry){
            return responseHandler(res, 400, false, "Token expired!! Please login again")
        }

        const newOtp = generateOTP();

        user.emailCode.code = newOtp;
        user.emailCode.codeExpiry = Date.now() + 1000 * 60 * 15;
        await user.save()

        const emailType =
        type === "forgot"
            ? { subject: "Password Reset OTP", template: "forgot" }
            : { subject: "Email Verification", template: "verify" };

        await sendVerificationEmail(user.email, emailType.subject, newOtp, emailType.template, user.firstName)

        return responseHandler(res, 200, true, "New OTP code send successfully",{email: user.email})
    } catch (error) {
        return responseErrorHandler(res)
    }
}

export const forgotPassword = async (req, res) =>{
    try {
        const { email } = req.body || {}

        if(!email){
            return responseHandler(res, 400, false, "Email required")
        }

        const user = await userModel.findOne({email})

        if(!user){
            return responseHandler(res, 400, false, "Invalid email address")
        }

        const otp = generateOTP()
        
        await sendVerificationEmail(user.email, "Password reset Verification", otp, "forgot", user.firstName)


        const tempToken = crypto.randomBytes(32).toString("hex")
        const tokenExpiry = Date.now() + 1000 * 60 * 15


        user.emailCode.code = otp
        user.emailCode.codeExpiry =  tokenExpiry;
        user.securityToken.token = tempToken;
        user.securityToken.tokenExpiry = tokenExpiry
        await user.save()
        
        return responseHandler(res, 200, true, "Otp send to you email", {token: tempToken, email: user.email})
    } catch (error) {
        return responseErrorHandler(res)
    }
}

export const verifyForgotOtp = async (req, res) => {
  try {
    const { token, code } = req.body || {}

    if (!token || !code)
      return responseHandler(res, 400, false, "Invalid payload");

    const user = await userModel.findOne({ "securityToken.token": token });

    if (!user) return responseHandler(res, 404, false, "Invalid token");

    if (Date.now() > user.securityToken.tokenExpiry)
      return responseHandler(res, 400, false, "Token expired");

    if (String(user.emailCode.code) !== String(code))
      return responseHandler(res, 400, false, "Invalid OTP");

    if (Date.now() > user.emailCode.codeExpiry){
        return responseHandler(res, 400, false, "OTP expired");
    }

    const tempToken = crypto.randomBytes(32).toString("hex")
    const tokenExpiry = Date.now() + 1000 * 60 * 15

    user.emailCode.code = null
    user.emailCode.codeExpiry = null
    user.securityToken.token = tempToken;
    user.securityToken.tokenExpiry = tokenExpiry

    await user.save();

    return responseHandler(res, 200, true, "OTP verified successfully", {token: tempToken});
  } catch (error) {
    return responseErrorHandler(res);
  }
};

export const resetPassword = async (req, res) =>{
    try {
        const {token, password} = req.body || {}
        if(!token || !password) {
            return responseHandler(res, 400, false, "Invalid payload")
        }

        const user = await userModel.findOne({"securityToken.token": token}).select("+password")
        if(!user){
            return responseHandler(res, 400, false, "Invalid token")
        }
        if(Date.now() > user.securityToken.tokenExpiry){
            return responseHandler(res, 400, false, "Token expire!! Please initiate password reset again.")
        }

        const hash = bcrypt.hashSync(password, 10);

        user.password = hash
        user.securityToken.token = null
        user.securityToken.tokenExpiry = null
        await user.save()

        return responseHandler(res, 200, true, "Password changed successfully")
    } catch (error) {
        return responseErrorHandler(res)   
    }
}

export const logout = (req, res) =>{
    try {
        res.clearCookie("token")
        return responseHandler(res, 200, true, "User logout successfull")
    } catch (error) {
        return responseErrorHandler(res)
    }
}


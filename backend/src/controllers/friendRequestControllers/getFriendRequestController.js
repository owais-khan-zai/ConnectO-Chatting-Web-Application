import jwt from "jsonwebtoken"
import { responseErrorHandler, responseHandler } from "../../utils/responseHandler.js"
import { userModel } from "../../models/user_model.js"

export const getFriendRequestReceive = async (req, res) => {
    try {
        const token = req.cookies.token

        if(!token){
            return responseHandler(res, 401, false, "Login your account")
        }

        const decodeToken = jwt.verify(token , process.env.JWT_SECRET)

        const user = await userModel.findById(decodeToken.id).populate("friendRequestReceive", "firstName lastName profilePic email").select("+friendRequestSend")

        if(!user) {
            return responseHandler(res, 400, false, "Invalid token")
        }

        return responseHandler(res, 200 , true, "Get friend request receive successfully", user.friendRequestReceive)
    } catch (error) {
        return responseErrorHandler(res)
    }
}

export const getFriendRequestSend = async (req, res) => {
    try {
        const token = req.cookies.token

        if(!token){
            return responseHandler(res, 401, false, "Login your account")
        }

        const decodeToken = jwt.verify(token , process.env.JWT_SECRET)

        const user = await userModel.findById(decodeToken.id).populate("friendRequestSend", "firstName lastName profilePic email").select("friendRequestSend")

        if(!user) {
            return responseHandler(res, 400, false, "Invalid token")
        }

        return responseHandler(res, 200 , true, "Get friend request send successfully", user.friendRequestSend)
    } catch (error) {
        return responseErrorHandler(res)
    }
}
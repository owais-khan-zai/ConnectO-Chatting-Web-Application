import { userModel } from "../../models/user_model.js"
import { responseErrorHandler, responseHandler } from "../../utils/responseHandler.js"
import { userDataFilterFunction } from "../../utils/userDataFilterFunction.js"
import jwt from 'jsonwebtoken'

export const getUser = async (req, res) => {
    try {
        const token = req.cookies.token

        if(!token){
            return responseHandler(res, 400, false, "Login your account first")
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return responseHandler(res, 400, false, "Invalid token! Login again")
        }

        const mainUser = await userModel.findById(decoded.id).select("+friends +friendRequestSend +friendRequestReceive");

        if (!mainUser) {
            return responseHandler(res, 404, false, "Login your account first");
        }

        const users = await userModel.find()

        const filterOutLoggedInUser = users.filter((user) => user._id.toString() !== decoded.id)

        const filterOutAlreadyFriendsUser = filterOutLoggedInUser.filter(
        user => !mainUser.friends.some(id => id.toString() === user._id.toString())
        );

        const filterOutAlreadyInRequestReceive = filterOutAlreadyFriendsUser.filter(
        user => !mainUser.friendRequestReceive.some(id => id.toString() === user._id.toString())
        );

        const filterOutAlreadyInRequestSend = filterOutAlreadyInRequestReceive.filter(
        user => !mainUser.friendRequestSend.some(id => id.toString() === user._id.toString())
        );

        const mainSendingData = filterOutAlreadyInRequestSend.map(user => userDataFilterFunction(user));

        return responseHandler(res, 200, true, "All users fetched successfully", mainSendingData)
    } catch (error) {
        console.log("Error is: ", error)
        return responseErrorHandler(res)   
    }
}


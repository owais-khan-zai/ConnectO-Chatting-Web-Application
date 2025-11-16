import { responseErrorHandler, responseHandler } from "../../utils/responseHandler.js"
import jwt from "jsonwebtoken";
import { userModel } from "../../models/user_model.js";

export const friendRequestSend = async (req, res) =>{
    try {
        const token = req.cookies.token

        if(!token){
            return responseHandler(res, 400, false, "Login your account first")
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decode.id).select("+friends +friendRequestSend +friendRequestReceive")

        if(!user){
            return responseHandler(res, 400, false, "Invalid token")
        }

        const {receiverId} = req.body

        if(!receiverId){
            return responseHandler(res, 400, false, "Receiver ID is required")
        }

        const receiverUser = await userModel.findById(receiverId).select("+friends +friendRequestSend +friendRequestReceive")
        

        if(!receiverUser){
            return responseHandler(res, 400, false, "Invalid ID request")
        }

        if (receiverId === user._id.toString()) {
            return responseHandler(res, 400, false, "You cannot send a friend request to yourself");
        }

        if(user.friends.includes(receiverId)){
            return responseHandler(res, 400, false, "Already friends")
        }

        if(user.friendRequestSend.includes(receiverId)){
            return responseHandler(res, 400, false, "Friend request already sent")
        }

        user.friendRequestSend.push(receiverId)
        receiverUser.friendRequestReceive.push(user._id)

        await user.save()
        await receiverUser.save()
        return responseHandler(res, 200, true, "Friend request sent successfully")

    } catch (error) {
        console.log("Error: ", error)
        return responseErrorHandler(res)
    }
}

export const friendRequesWithdraw = async (req, res) =>{
    try {
        const token = req.cookies.token

        if(!token){
            return responseHandler(res, 400, false, "Login your account first")
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decode.id).select("+friends +friendRequestSend +friendRequestReceive")

        if(!user){
            return responseHandler(res, 400, false, "Invalid token")
        }

        const {receiverId} = req.body

        if(!receiverId){
            return responseHandler(res, 400, false, "Receiver ID is required")
        }

        const receiverUser = await userModel.findById(receiverId).select("+friends +friendRequestSend +friendRequestReceive")
        

        if(!receiverUser){
            return responseHandler(res, 400, false, "Invalid ID request")
        }

        if(user.friends.includes(receiverId)){
            return responseHandler(res, 400, false, "You were already Friends")
        }

        if(!user.friendRequestSend.includes(receiverId)){
            return responseHandler(res, 400, false, "Invalid request")
        }

        if (user.friendRequestReceive.includes(receiverId)) {
           return responseHandler(res, 400, false, "Already pending request from this user");
        }

        user.friendRequestSend = user.friendRequestSend.filter((id) => id.toString() !== receiverId)
        receiverUser.friendRequestReceive = receiverUser.friendRequestReceive.filter((id) => id.toString() !== user._id.toString())

        await user.save()
        await receiverUser.save()

        return responseHandler(res, 200, true, "Friend request Withdraw")

    } catch (error) {
        return responseErrorHandler(res)
    }
}

export const friendRequestAccept = async (req, res) =>{
    try {
         const token = req.cookies.token

        if(!token){
            return responseHandler(res, 400, false, "Login your account first")
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decode.id)

        if(!user){
            return responseHandler(res, 400, false, "Invalid token")
        }

        const {senderId} = req.body

        if(!senderId){
            return responseHandler(res, 400, false, "Receiver ID is required")
        }

        const senderUser = await userModel.findById(senderId)
        

        if(!senderUser){
            return responseHandler(res, 400, false, "Invalid ID request")
        }

        if (!user.friendRequestReceive.includes(senderId)) {
            return responseHandler(res, 400, false, "No friend request found from this user");
        }

        
        user.friends.push(senderId)
        user.friendRequestReceive = user.friendRequestReceive.filter((id) => id.toString() !== senderId)
        senderUser.friends.push(user._id)
        senderUser.friendRequestSend = senderUser.friendRequestSend.filter((id) => id.toString() !== user._id)

        await user.save()
        await senderUser.save()

        return responseHandler(res, 200, true, "Friend request accepted")
    } catch (error) {
        console.log("Error: ", error)
        return responseErrorHandler(res)
    }
}

export const friendRequestReject = async (req, res) => {
    try {
         const token = req.cookies.token

        if(!token){
            return responseHandler(res, 400, false, "Login your account first")
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decode.id)

        if(!user){
            return responseHandler(res, 400, false, "Invalid token")
        }

        const {senderId} = req.body

        if(!senderId){
            return responseHandler(res, 400, false, "Receiver ID is required")
        }

        const senderUser = await userModel.findById(senderId)

        if(!senderUser){
            return responseHandler(res, 400, false, "Invalid ID request")
        }

        user.friendRequestReceive = user.friendRequestReceive.filter((id) => id.toString() !== senderId)
        senderUser.friendRequestSend = senderUser.friendRequestSend.filter((id) => id.toString() !== user._id)

        await user.save()
        await senderUser.save()

        return responseHandler(res, 200, true, "Friend request rejected")
    } catch (error) {
        console.log("Error: ", error)
        responseErrorHandler(res)
    }
}
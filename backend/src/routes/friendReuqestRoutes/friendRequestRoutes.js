import express from "express"
import { friendRequestAccept, friendRequestReject, friendRequestSend, friendRequesWithdraw } from "../../controllers/friendRequestControllers/requestController.js"
import { getFriendRequestReceive, getFriendRequestSend } from "../../controllers/friendRequestControllers/getFriendRequestController.js"
const router = express.Router()

// friend request handlers
router.post('/send', friendRequestSend)   
router.post('/withdraw', friendRequesWithdraw)   
router.post('/accept', friendRequestAccept)   
router.post('/reject', friendRequestReject)


// friend requests get 
router.get('/receive-request', getFriendRequestReceive)
router.get('/send-request', getFriendRequestSend)

export default router
import {
  acceptFriendRequest,
  rejectFriendRequest,
  sendFriendRequest,
  withdrawFriendRequest,
} from "../../api/friendRequestApi/FriendRequestApiUrl";
import { ApiRequestHandler } from "../../hooks/UseApiRequestHandler";

export const friendRequestServices = {
  friendRequestSend: (data) => ApiRequestHandler("post", sendFriendRequest, data),
  friendRequestWithdraw: (data) => ApiRequestHandler("post", withdrawFriendRequest, data),
  friendRequestAccept: (data) => ApiRequestHandler("post", acceptFriendRequest, data),
  friendRequestReject: (data) => ApiRequestHandler("post", rejectFriendRequest, data),
};

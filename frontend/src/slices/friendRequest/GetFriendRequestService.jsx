import { getFriendRequestReceive, getFriendRequestSend } from "../../api/friendRequestApi/FriendRequestApiUrl";
import { ApiRequestHandler } from "../../hooks/UseApiRequestHandler";

export const getFriendRequests = {
  getFriendRequestReceive: () => ApiRequestHandler("get", getFriendRequestReceive),
  getFriendRequestSend: () => ApiRequestHandler("get", getFriendRequestSend)
};

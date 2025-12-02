import { getUser, loggedInUser } from "../../api/userApi/userApiUrl";
import { ApiRequestHandler } from "../../hooks/UseApiRequestHandler";

export const userServices = {
  getUser: () => ApiRequestHandler("get", getUser),
  loggedInUser: () => ApiRequestHandler("get", loggedInUser),
};

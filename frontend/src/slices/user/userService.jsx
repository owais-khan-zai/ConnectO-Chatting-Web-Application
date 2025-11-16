import { getUser } from "../../api/userApi/userApiUrl";
import { ApiRequestHandler } from "../../hooks/UseApiRequestHandler";

export const userServices = {
  getUser: () => ApiRequestHandler("get", getUser),
};

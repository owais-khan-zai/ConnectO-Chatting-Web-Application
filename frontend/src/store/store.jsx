import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/auth/AuthSlice";
import sidebarNavigationReducer from "../slices/sidebarNavigation/SidebarNavigationSlice";
import friendRequestReducer from "../slices/friendRequest/FriendRequestSlice";
import userReducer from "../slices/user/userSlice";
import getFriendRequestReducer from "../slices/friendRequest/GetFriendRequestSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebarNavigation: sidebarNavigationReducer,
    friendRequest: friendRequestReducer,
    user: userReducer,
    getFriendRequest: getFriendRequestReducer,
  },
});

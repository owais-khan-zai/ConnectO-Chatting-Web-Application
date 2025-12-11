import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userServices } from "./userService";
import { loggedInUser } from "../../api/userApi/userApiUrl";



// All Thunks
export const getUserThunk = createAsyncThunk( 'get/users', async (_, { rejectWithValue }) => {
    try {
      const response = await userServices.getUser();
      return response;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || "Something went wrong!";
      return rejectWithValue(errMsg);
    }
  }
);

export const loggedInUserThunk = createAsyncThunk( 'get/logged-in-user', async (_, { rejectWithValue }) => {
    try {
      const response = await userServices.loggedInUser();
      return response;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || "Something went wrong!";
      return rejectWithValue(errMsg);
    }
  }
);



const initialState = {
    AllUsersApiResponse: null,
    AllUsersApiLoading: false,
    AllUsersApiError: false,
    
    loggedInUserApiResponse: null,
    loggedInUserApiLoading: false,
    loggedInUserApiError: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
         resetUserState: (state) => {
            state.AllUsersApiResponse = null;
            state.AllUsersApiError = null;
            state.AllUsersApiLoading = false;

            state.loggedInUserApiResponse = null;
            state.loggedInUserApiError = null;
            state.loggedInUserApiLoading = false;
        }
    },
    extraReducers: (builder) => {
         builder
            .addCase(getUserThunk.pending, (state)=>{
                state.AllUsersApiLoading = true;
            })
            .addCase(getUserThunk.fulfilled, (state, action)=>{
                state.AllUsersApiLoading = false;
                state.AllUsersApiResponse = action.payload;
            })
            .addCase(getUserThunk.rejected, (state, action)=>{
                state.AllUsersApiLoading = false;
                state.AllUsersApiError = action.payload;
            })
  
          builder
              .addCase(loggedInUserThunk.pending, (state)=>{
                  state.loggedInUserApiLoading = true;
              })
              .addCase(loggedInUserThunk.fulfilled, (state, action)=>{
                  state.loggedInUserApiLoading = false;
                  state.loggedInUserApiResponse = action.payload;
              })
              .addCase(loggedInUserThunk.rejected, (state, action)=>{
                  state.loggedInUserApiLoading = false;
                  state.loggedInUserApiError = action.payload;
            })
    }
})

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;

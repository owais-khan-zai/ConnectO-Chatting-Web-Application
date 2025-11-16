import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFriendRequests } from "./GetFriendRequestService";



// All Thunks
export const getFriendRequestReceiveThunk = createAsyncThunk( 'get/friend-request/receive', async (_, { rejectWithValue }) => {
    try {
      const response = await getFriendRequests.getFriendRequestReceive();
      return response;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || "Something went wrong!";
      return rejectWithValue(errMsg);
    }
  }
);

export const getFriendRequestSendThunk = createAsyncThunk( 'get/friend-request/send', async (_, { rejectWithValue }) => {
    try {
      const response = await getFriendRequests.getFriendRequestSend();
      return response;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || "Something went wrong!";
      return rejectWithValue(errMsg);
    }
  }
);


const initialState = {
    response: null,
    loading: false,
    error: false
}

const getFriendRequestSlice = createSlice({
    name: "getfriendRequest",
    initialState,
    reducers: {
        resetGetFriendRequestState: (state) => {
            state.response = null;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        const thunks = [
            getFriendRequestReceiveThunk,
            getFriendRequestSendThunk,
        ]

        thunks.forEach((thunks)=>{
            builder.addCase(thunks.pending, (state)=>{
                state.loading = true
                state.error = false
                state.response = null
            })
            builder.addCase(thunks.fulfilled, ( state, action) => {
                state.loading = false, 
                state.response = action.payload
                state.error = false
            })
            builder.addCase(thunks.rejected, (state, action) => {
                state.loading = false;
                state.response = null;
                state.error = action.payload || "Something went wrong!";
            });
        })
    }
})

export const { resetGetFriendRequestState } = getFriendRequestSlice.actions;
export default getFriendRequestSlice.reducer;

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
    responseReceiveRequest: null,
    responseSendRequest: null,
    sendRequestloading: false,
    receiveRequestLoading: false,
    sendRequesterror: false,
    receiveRequestError: false
}

const getFriendRequestSlice = createSlice({
    name: "getfriendRequest",
    initialState,
    reducers: {
        resetGetFriendRequestState: (state) => {
            state.responseReceiveRequest = null;
            state.receiveRequestError = null;
            state.receiveRequestLoading = false;

            state.responseSendRequest = null;
            state.sendRequestError = null;
            state.sendRequestloading = false;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(getFriendRequestReceiveThunk.pending, (state)=>{
              state.receiveRequestLoading = true;
          })
          .addCase(getFriendRequestReceiveThunk.fulfilled, (state, action)=>{
              state.receiveRequestLoading = false;
              state.responseReceiveRequest = action.payload;
          })
          .addCase(getFriendRequestReceiveThunk.rejected, (state, action)=>{
              state.receiveRequestLoading = false;
              state.receiveRequestError = action.payload;
          })

        builder
            .addCase(getFriendRequestSendThunk.pending, (state)=>{
                state.sendRequestloading = true;
            })
            .addCase(getFriendRequestSendThunk.fulfilled, (state, action)=>{
                state.sendRequestloading = false;
                state.responseSendRequest = action.payload;
            })
            .addCase(getFriendRequestSendThunk.rejected, (state, action)=>{
                state.sendRequestloading = false;
                state.sendRequestError = action.payload;
            })
    }
})

export const { resetGetFriendRequestState } = getFriendRequestSlice.actions;
export default getFriendRequestSlice.reducer;

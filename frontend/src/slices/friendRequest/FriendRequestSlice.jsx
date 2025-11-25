import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { friendRequestServices } from "./friendRequestService";



// All Thunks
export const sendRequestThunk = createAsyncThunk( 'send/request', async (data, { rejectWithValue }) => {
    try {
      const response = await friendRequestServices.friendRequestSend(data);
      return response;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || "Something went wrong!";
      return rejectWithValue(errMsg);
    }
  }
);

export const withdrawRequestThunk = createAsyncThunk( 'withdraw/request', async (data, { rejectWithValue }) => {
    try {
      const response = await friendRequestServices.friendRequestWithdraw(data);
      return response;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || "Something went wrong!";
      return rejectWithValue(errMsg);
    }
  }
);

export const acceptRequestThunk = createAsyncThunk( 'accept/request', async (data, { rejectWithValue }) => {
    try {
      const response = await friendRequestServices.friendRequestAccept(data);
      return response;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || "Something went wrong!";
      return rejectWithValue(errMsg);
    }
  }
);
export const rejectRequestThunk = createAsyncThunk( 'reject/request', async (data, { rejectWithValue }) => {
    try {
      const response = await friendRequestServices.friendRequestReject(data);
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

const friendRequestSlice = createSlice({
    name: "friendRequest",
    initialState,
    reducers: {
        resetFriendRequestState: (state) => {
            state.response = null;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        const thunks = [
            sendRequestThunk,
            acceptRequestThunk,
            rejectRequestThunk
        ]

        thunks.forEach((thunks)=>{
            builder.addCase(thunks.pending, (state)=>{
            state.loading = true;
            state.error = false;
            state.response = null
            })
            builder.addCase(thunks.fulfilled, ( state, action) => {
                state.loading = false;
                state.response = action.payload;
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

export const { resetFriendRequestState } = friendRequestSlice.actions;
export default friendRequestSlice.reducer;

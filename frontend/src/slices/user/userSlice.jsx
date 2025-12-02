import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userServices } from "./userService";



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
    response: null,
    loading: false,
    error: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUserState: (state) => {
            state.response = null;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        const thunks = [
            getUserThunk,
            loggedInUserThunk
        ]

        thunks.forEach((thunk)=>{
            builder.addCase(thunk.pending, (state)=>{
            state.loading = true
            state.error = false
            state.response = null
            })
            builder.addCase(thunk.fulfilled, ( state, action) => {
                state.loading = false
                state.response = action.payload
                state.error = false
            })
            builder.addCase(thunk.rejected, (state, action) => {
                state.loading = false;
                state.response = null;
                state.error = action.payload || "Something went wrong!";
            });
        })
    }
})

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;

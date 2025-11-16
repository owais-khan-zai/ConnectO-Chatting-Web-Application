import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./authService";


// All Thunks
export const signupThunk = createAsyncThunk( 'auth/signup', async (data, { rejectWithValue }) => {
    try {
      const response = await authService.signup(data);
      return response;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message || "Something went wrong!";
      return rejectWithValue(errMsg);
    }
  }
);

export const loginThunk = createAsyncThunk('auth/login', async (data, {rejectWithValue}) => {
    try {
        const response = await authService.login(data)
        return response
    } catch (error) {
        const errMsg = error.response?.data?.message || error.message || "Something went wrong!";
        return rejectWithValue(errMsg);
    }
})
export const verifyEmailThunk = createAsyncThunk('auth/verifyEmail', async (data, {rejectWithValue}) => {
    try {
        const response = await authService.verifyEmail(data)
        return response
    } catch (error) {
       const errMsg = error.response?.data?.message || error.message || "Something went wrong!";
       return rejectWithValue(errMsg);
    }
})
export const resendOtpThunk = createAsyncThunk('auth/resendOtp', async (data, {rejectWithValue}) => {
    try {
        const response = await authService.resendOtp(data)
        return response
    } catch (error) {
        const errMsg = error.response?.data?.message || error.message || "Something went wrong!";
        return rejectWithValue(errMsg);
    }
})
export const forgotPasswordThunk = createAsyncThunk('auth/forgotPassword', async (data, {rejectWithValue}) => {
    try {
        const response = await authService.forgotPassword(data)
        return response
    } catch (error) {
        const errMsg = error.response?.data?.message || error.message || "Something went wrong!";
        return rejectWithValue(errMsg);
    }
})
export const verifyForgotOtpThunk = createAsyncThunk('auth/verifyForgotOtp', async (data, {rejectWithValue}) => {
    try {
        const response = await authService.verifyForgotOtp(data)
        return response
    } catch (error) {
        const errMsg = error.response?.data?.message || error.message || "Something went wrong!";
        return rejectWithValue(errMsg);
    }
})
export const resetPasswordThunk = createAsyncThunk('auth/resetPassword', async (data, {rejectWithValue}) => {
    try {
        const response = await authService.resetPassword(data)
        return response
    } catch (error) {
        const errMsg = error.response?.data?.message || error.message || "Something went wrong!";
        return rejectWithValue(errMsg);
    }
})
export const logoutThunk = createAsyncThunk('auth/logout', async (_,{rejectWithValue}) => {
    try {
        const response = await authService.logout(data)
        return response
    } catch (error) {
        const errMsg = error.response?.data?.message || error.message || "Something went wrong!";
        return rejectWithValue(errMsg);
    }
})



const initialState = {
    response: null,
    loading: false,
    error: false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
       resetAuthState: (state) => {
            state.response = null;
            state.error = null;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        const thunks = [ 
            signupThunk,
            loginThunk,
            verifyEmailThunk,
            resendOtpThunk,
            forgotPasswordThunk,
            verifyForgotOtpThunk,
            resetPasswordThunk,
            logoutThunk,
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

export const { resetAuthState } = authSlice.actions;

export default authSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";

export const register = createAsyncThunk("auth/register", async (body, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${baseUrl}/Account/Register`, body);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const login = createAsyncThunk("auth/login", async (body, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${baseUrl}/Account/login`, body);
        return data;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data);
    }
});

export const forgetPassword = createAsyncThunk("auth/forgetPassword", async (body, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${baseUrl}/Account/forgetPassword`, body);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const verifyOTP = createAsyncThunk("auth/verifyOTP", async (body, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${baseUrl}/Account/verifyOTP`, body);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const resetPassword = createAsyncThunk("auth/resetPassword", async (body, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${baseUrl}/Account/resetPassword`, body);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});


const initialState = {
    message: "",
    role: "",
    data: [],
    loading: false,
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log(action);
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(forgetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(forgetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(forgetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(verifyOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(verifyOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

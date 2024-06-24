import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { toast } from "react-toastify";
const notify = (msg, type) => toast[type](msg);

const getUserId = () => localStorage.getItem("trackerUserId")
const getToken = () => localStorage.getItem("trackerToken")
const user = getUserId
export const getAllUsers = createAsyncThunk("auth/getAllUsers", async (token) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Admin/users`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        return data;
    } catch (error) {
        return error.response.data;
    }
});
export const getAllUsersSearch = createAsyncThunk("auth/getAllUsersSearch", async ({ token, params }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Admin/users/search`, {
            headers: {
                "Authorization": "Bearer " + token
            },
            params
        });
        return data;
    } catch (error) {
        return error.response.data;
    }
});

export const deleteUser = createAsyncThunk("auth/deleteUser", async (id, token) => {
    try {
        const { data } = await axios.delete(`${baseUrl}/Admin/users/${id.id}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        notify('User deleted successfully', 'success');
        getAllUsers(token)
        return data;
    } catch (error) {
        notify('Failed to delete User', 'error');
        return error.response.data;
    }
});

export const register = createAsyncThunk("auth/register", async (body) => {
    try {
        const formData = new FormData();

        Object.keys(body).forEach(key => {
            formData.append(key, body[key]);
        });

        const { data } = await axios.post(`${baseUrl}/Account/Register`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        if (data.data === "Email verification has been sent to your email successfully. Please verify it!") {
            notify('Now, Check your Email', 'success');
        }

        return data;
    } catch (error) {
        return error.response.data;
    }
});
export const login = createAsyncThunk("auth/login", async (body) => {
    try {
        const { data } = await axios.post(`${baseUrl}/Account/login`, body);
        if (data.token) {
            notify('Logged in', 'success')
        }
        localStorage.setItem("trackerToken", data.token)
        localStorage.setItem("trackerRole", data.role)
        localStorage.setItem("trackerUserId", data.id)
        return data;
    } catch (error) {
        return error.response.data;
    }
});

export const forgetPassword = createAsyncThunk("auth/forgetPassword", async (body, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${baseUrl}/Account/forgetPassword`, null, {
            headers: body
        });
        if (data == "Password reset email sent successfully.") {
            notify("OTP sent to your email", "success")
        }
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const verifyOTP = createAsyncThunk("auth/verifyOTP", async (body, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${baseUrl}/Account/verfiyOtp`, body);
        if (data == "Valid") {
            notify("Correct OTP, reset your password now.", "success")
        }

        return data;
    } catch (error) {
        if (error.response.data == "Invalid OTP.") {
            notify("Invalid OTP", "error")
        }
        if (error.response) {
            return rejectWithValue(error.response.data);
        }
        return rejectWithValue({ message: 'Network error' });
    }
});

export const resetPassword = createAsyncThunk("auth/resetPassword", async (body, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`${baseUrl}/Account/resetPassword`, body);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateProfile = createAsyncThunk("user/update", async ({ body, userId, token }, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        for (const key in body) {
            formData.append(key, body[key]);
        }

        const { data } = await axios.put(`${baseUrl}/User/users/${userId || user}`, formData, {
            headers: {
                "Authorization": "Bearer " + (token || getToken()),
                'Content-Type': 'multipart/form-data'
            }
        });
        getUserById({ userId, token })
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
export const getUserById = createAsyncThunk("user/getUserById", async ({ userId, token }, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Account/getUserInfo/${userId || user}`, {
            headers: {
                "Authorization": "Bearer " + (token || getToken()),
            }
        });
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const initialState = {
    message: "",
    role: localStorage.getItem("trackerRole") || null,
    users: [],
    loading: false,
    user: null,
    token: localStorage.getItem("trackerToken") || null,
    userId: localStorage.getItem("trackerUserId") || null,
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
            localStorage.removeItem("trackerToken")
            state.isAuthenticated = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                if (action.payload?.errors?.length > 0) {
                    state.error = action.payload.errors
                }
                if (action.payload == "User with this email already exists.") {
                    state.error = action.payload
                }
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                if (action.payload == "User with this email already exists.") {
                    state.error = action.payload
                }
                state.error = action.payload
            })
            // -------------------------------------------------------------
            .addCase(getUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                if (action.payload?.errors?.length > 0) {
                    state.error = action.payload.errors
                }
                state.loading = false;
                state.user = action.payload.data;
            })
            .addCase(getUserById.rejected, (state, action) => {
                state.loading = false;
                if (action.payload == "User not found.") {
                    state.error = action.payload.message
                }
                state.error = action.payload.message
            })
            // -------------------------------------------------------------
            .addCase(getAllUsersSearch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllUsersSearch.fulfilled, (state, action) => {
                if (action.payload?.errors?.length > 0) {
                    state.error = action.payload.errors
                }
                state.loading = false;
                state.users = action.payload.data;
            })
            .addCase(getAllUsersSearch.rejected, (state, action) => {
                state.loading = false;
                if (action.payload == "User with this email already exists.") {
                    state.error = action.payload
                }
                state.error = action.payload
            })
            // -------------------------------------------------------------
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                if (action.payload?.errors?.length > 0) {
                    state.error = action.payload.errors
                }
                if (action.payload == "User with this email already exists.") {
                    state.error = action.payload
                }
                state.loading = false;
                state.message = action.payload.data;
                state.user = action.payload.user;
                state.token = localStorage.getItem("trackerToken") || action.payload.token;
                state.isAuthenticated = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                if (action.payload == "User with this email already exists.") {
                    state.error = action.payload
                }
                state.error = action.payload
            })
            // -------------------------------------------------------------
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload == "Incorrect email or password.") {
                    state.error = action.payload
                }
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.userId = action.payload.id;
                state.isAuthenticated = true;
                state.role = action.payload.role
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                if (action.payload == "Incorrect email or password.") {
                    state.error = action.payload
                }
                state.error = action.payload || action.error.message;
            })
            // -------------------------------------------------------------
            .addCase(forgetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(forgetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
                if (action.payload?.errors?.length > 0) {
                    state.error = action.payload.errors
                }
            })
            .addCase(forgetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
                if (action.payload?.errors?.length > 0) {
                    state.error = action.payload.errors
                }
            })
            // -------------------------------------------------------------
            .addCase(verifyOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOTP.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(verifyOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || action.payload || action.error.message;
            })
            // -------------------------------------------------------------
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

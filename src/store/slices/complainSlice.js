import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { toast } from "react-toastify";

const notify = (msg, type) => toast[type](msg);

export const getAllComplains = createAsyncThunk("Complains/getAll", async (token, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Complains`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getAllComplainsSearch = createAsyncThunk("Complains/getAllSearch", async ({ token, params }, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Admin/complaints/search`, {
            headers: {
                "Authorization": "Bearer " + token
            },
            params
        });
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getOneComplain = createAsyncThunk("Complains/getOne", async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Complains/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addComplain = createAsyncThunk("Complains/addOne", async (body, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${baseUrl}/Complains`, body);
        notify('Complain added successfully', 'success');
        return data;
    } catch (error) {
        notify('Failed to add Complain', 'error');
        return rejectWithValue(error.response.data);
    }
});


export const deleteComplain = createAsyncThunk("Complains/deleteOne", async ({ id, token }, { rejectWithValue }) => {
    try {
        await axios.delete(`${baseUrl}/Complains/${id}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        notify('Complain deleted successfully', 'success');
        return id;
    } catch (error) {
        notify('Failed to delete Complain', 'error');
        return rejectWithValue(error.response.data);
    }
});

const initialState = {
    complains: [],
    complain: null,
    loading: false,
    error: null,
};

const complainSlice = createSlice({
    name: "complains",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get All Complains-----------------------------------------
            .addCase(getAllComplains.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllComplains.fulfilled, (state, action) => {
                state.loading = false;
                state.complains = action.payload.data;
            })
            .addCase(getAllComplains.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Get All Complains Search-----------------------------------------
            .addCase(getAllComplainsSearch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllComplainsSearch.fulfilled, (state, action) => {
                state.loading = false;
                state.complains = action.payload.data;
            })
            .addCase(getAllComplainsSearch.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Get One Complain--------------------------------------------
            .addCase(getOneComplain.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOneComplain.fulfilled, (state, action) => {
                state.loading = false;
                state.Complain = action.payload.data;
            })
            .addCase(getOneComplain.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Add Complain---------------------------------------------------
            .addCase(addComplain.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addComplain.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message
            })
            .addCase(addComplain.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Delete Complain--------------------------------------------------
            .addCase(deleteComplain.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteComplain.fulfilled, (state, action) => {
                state.loading = false;
                state.complains = state.complains.filter(Complain => Complain.id !== action.payload);
            })
            .addCase(deleteComplain.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export default complainSlice.reducer;

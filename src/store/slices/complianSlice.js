import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { toast } from "react-toastify";

const notify = (msg, type) => toast[type](msg);

export const getAllComplaints = createAsyncThunk("complaints/getAll", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Complaints`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getOneComplaint = createAsyncThunk("complaints/getOne", async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Complaints/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addComplaint = createAsyncThunk("complaints/addOne", async (complaint, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${baseUrl}/Complaints`, complaint);
        notify('Complaint added successfully', 'success');
        return data;
    } catch (error) {
        notify('Failed to add complaint', 'error');
        return rejectWithValue(error.response.data);
    }
});

export const updateComplaint = createAsyncThunk("complaints/updateOne", async ({ id, complaint }, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`${baseUrl}/Complaints/${id}`, complaint);
        notify('Complaint updated successfully', 'success');
        return data;
    } catch (error) {
        notify('Failed to update complaint', 'error');
        return rejectWithValue(error.response.data);
    }
});

export const deleteComplaint = createAsyncThunk("complaints/deleteOne", async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${baseUrl}/Complaints/${id}`);
        notify('Complaint deleted successfully', 'success');
        return id;
    } catch (error) {
        notify('Failed to delete complaint', 'error');
        return rejectWithValue(error.response.data);
    }
});

const initialState = {
    complaints: [],
    complaint: null,
    loading: false,
    error: null,
};

const complainSlice = createSlice({
    name: "complaints",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get All Complaints-----------------------------------------
            .addCase(getAllComplaints.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllComplaints.fulfilled, (state, action) => {
                state.loading = false;
                state.complaints = action.payload.data;
            })
            .addCase(getAllComplaints.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Get One Complaint--------------------------------------------
            .addCase(getOneComplaint.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOneComplaint.fulfilled, (state, action) => {
                state.loading = false;
                state.complaint = action.payload.data;
            })
            .addCase(getOneComplaint.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Add Complaint---------------------------------------------------
            .addCase(addComplaint.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addComplaint.fulfilled, (state, action) => {
                state.loading = false;
                state.complaints.push(action.payload);
            })
            .addCase(addComplaint.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Update Complaint--------------------------------------------------
            .addCase(updateComplaint.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateComplaint.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.complaints.findIndex(complaint => complaint.id === action.payload.id);
                if (index !== -1) {
                    state.complaints[index] = action.payload;
                }
            })
            .addCase(updateComplaint.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Delete Complaint--------------------------------------------------
            .addCase(deleteComplaint.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteComplaint.fulfilled, (state, action) => {
                state.loading = false;
                state.complaints = state.complaints.filter(complaint => complaint.id !== action.payload);
            })
            .addCase(deleteComplaint.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export default complainSlice.reducer;

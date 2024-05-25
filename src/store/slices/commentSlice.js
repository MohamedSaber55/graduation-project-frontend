import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { toast } from "react-toastify";

const notify = (msg, type) => toast[type](msg);

export const getAllComments = createAsyncThunk("comments/getAll", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Comments`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getOneComment = createAsyncThunk("comments/getOne", async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Comments/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addComment = createAsyncThunk("comments/addOne", async (comment, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${baseUrl}/Comments`, comment);
        notify('Comment added successfully', 'success');
        return data;
    } catch (error) {
        notify('Failed to add comment', 'error');
        return rejectWithValue(error.response.data);
    }
});

export const updateComment = createAsyncThunk("comments/updateOne", async ({ id, comment }, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`${baseUrl}/Comments/${id}`, comment);
        notify('Comment updated successfully', 'success');
        return data;
    } catch (error) {
        notify('Failed to update comment', 'error');
        return rejectWithValue(error.response.data);
    }
});

export const deleteComment = createAsyncThunk("comments/deleteOne", async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${baseUrl}/Comments/${id}`);
        notify('Comment deleted successfully', 'success');
        return id;
    } catch (error) {
        notify('Failed to delete comment', 'error');
        return rejectWithValue(error.response.data);
    }
});

const initialState = {
    comments: [],
    comment: null,
    loading: false,
    error: null,
};

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get All Comments
            .addCase(getAllComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(getAllComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Get One Comment
            .addCase(getOneComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOneComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comment = action.payload;
            })
            .addCase(getOneComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Add Comment
            .addCase(addComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comments.push(action.payload);
            })
            .addCase(addComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Update Comment
            .addCase(updateComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.comments.findIndex(comment => comment.id === action.payload.id);
                if (index !== -1) {
                    state.comments[index] = action.payload;
                }
            })
            .addCase(updateComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Delete Comment
            .addCase(deleteComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = state.comments.filter(comment => comment.id !== action.payload);
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export default commentsSlice.reducer;

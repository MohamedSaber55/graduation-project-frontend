import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { toast } from "react-toastify";
const getUserId = () => localStorage.getItem("trackerUserId");
const getToken = () => localStorage.getItem("trackerToken");
const user = getUserId()

const notify = (msg, type) => toast[type](msg);

export const addItemComment = createAsyncThunk(
    "comments/addOne",
    async ({ body, userId, itemId }, { rejectWithValue }) => {
        console.log({ body, userId, itemId });
        try {
            const { data } = await axios.post(`${baseUrl}/ItemComments/${userId || user}/items/${itemId}/comments`, body);
            console.log(data);
            notify('Comment added successfully', 'success');
            return data;
        } catch (error) {
            console.error(error.response);
            notify('Failed to add comment', 'error');
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateItemComment = createAsyncThunk(
    "comments/updateOne",
    async ({ id, comment }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`${baseUrl}/Comments/${id}`, comment);
            notify('Comment updated successfully', 'success');
            return data;
        } catch (error) {
            notify('Failed to update comment', 'error');
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteItemComment = createAsyncThunk(
    "comments/deleteOne",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${baseUrl}/Comments/${id}`);
            notify('Comment deleted successfully', 'success');
            return id;
        } catch (error) {
            notify('Failed to delete comment', 'error');
            return rejectWithValue(error.response.data);
        }
    }
);

export const getItemComments = createAsyncThunk(
    "comments/getItemComments",
    async (itemId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${baseUrl}/ItemComments/items/${itemId}/comments`, {
                headers: {
                    "Authorization": "Bearer " + getToken()
                }
            });
            console.log(data);
            return data;
        } catch (error) {
            console.error(error.response);
            notify('Failed to fetch comments', 'error');
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    comments: [],
    comment: null,
    loading: false,
    error: null,
};

const itemCommentsSlice = createSlice({
    name: "itemComments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Add Comment
            .addCase(addItemComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addItemComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comments.push(action.payload);
            })
            .addCase(addItemComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Update Comment
            .addCase(updateItemComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateItemComment.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.comments.findIndex(comment => comment.id === action.payload.id);
                if (index !== -1) {
                    state.comments[index] = action.payload;
                }
            })
            .addCase(updateItemComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Delete Comment
            .addCase(deleteItemComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteItemComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = state.comments.filter(comment => comment.id !== action.payload);
            })
            .addCase(deleteItemComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Get Post Comments
            .addCase(getItemComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getItemComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload.data;
            })
            .addCase(getItemComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export default itemCommentsSlice.reducer;
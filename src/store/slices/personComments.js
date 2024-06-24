import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { toast } from "react-toastify";

const getUserId = () => localStorage.getItem("trackerUserId");
const getToken = () => localStorage.getItem("trackerToken");
const user = getUserId()

const notify = (msg, type) => toast[type](msg);

export const addPersonComment = createAsyncThunk(
    "comments/addOne",
    async ({ body, userId, personId }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${baseUrl}/PersonComments/${userId || user}/persons/${personId}/comments`, body);
            notify('Comment added successfully', 'success');
            return data;
        } catch (error) {
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

export const deletePersonComment = createAsyncThunk(
    "comments/deleteOne",
    async ({ userId, itemId, commentId }, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`${baseUrl}/personComments/${userId}/persons/${itemId}/comments/${commentId}`, {
                headers: {
                    "Authorization": "Bearer " + getToken()
                }
            });
            notify('Comment deleted successfully', 'success');
            return data;
        } catch (error) {
            notify('Failed to delete comment', 'error');
            return rejectWithValue(error.response.data);
        }
    }
);

export const getPersonComments = createAsyncThunk(
    "comments/getPersonComments",
    async (personId, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${baseUrl}/PersonComments/persons/${personId}/comments`, {
                headers: {
                    "Authorization": "Bearer " + getToken()
                }
            });
            return data;
        } catch (error) {
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
            .addCase(addPersonComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addPersonComment.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(addPersonComment.rejected, (state, action) => {
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
            .addCase(deletePersonComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePersonComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = state.comments.filter(comment => comment.id !== action.payload);
            })
            .addCase(deletePersonComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Get Post Comments
            .addCase(getPersonComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPersonComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload.data;
            })
            .addCase(getPersonComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export default itemCommentsSlice.reducer;
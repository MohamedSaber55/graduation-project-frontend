import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { toast } from "react-toastify";

const notify = (msg, type) => toast[type](msg);


export const getAllItems = createAsyncThunk("items/getAll", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Items`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const getOneItem = createAsyncThunk("items/getOne", async (id, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Items/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addItem = createAsyncThunk("items/addOne", async (item, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${baseUrl}/Items`, item);
        notify('Item added successfully', 'success');
        return data;
    } catch (error) {
        notify('Failed to add item', 'error');
        return rejectWithValue(error.response.data);
    }
});

export const updateItem = createAsyncThunk("items/updateOne", async ({ id, item }, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`${baseUrl}/Items/${id}`, item);
        notify('Item updated successfully', 'success');
        return data;
    } catch (error) {
        notify('Failed to update item', 'error');
        return rejectWithValue(error.response.data);
    }
});

export const deleteItem = createAsyncThunk("items/deleteOne", async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${baseUrl}/Items/${id}`);
        notify('Item deleted successfully', 'success');
        return id;
    } catch (error) {
        notify('Failed to delete item', 'error');
        return rejectWithValue(error.response.data);
    }
});

const initialState = {
    items: [],
    item: null,
    loading: false,
    error: null,
};

const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get All Items
            .addCase(getAllItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
            })
            .addCase(getAllItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Get One Item
            .addCase(getOneItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOneItem.fulfilled, (state, action) => {
                state.loading = false;
                state.item = action.payload;
            })
            .addCase(getOneItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Add Item
            .addCase(addItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(addItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Update Item
            .addCase(updateItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateItem.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(updateItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Delete Item
            .addCase(deleteItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.loading = false;
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export default itemsSlice.reducer;

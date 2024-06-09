import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { toast } from "react-toastify";
const notify = (msg, type) => toast[type](msg);
const getUserId = () => localStorage.getItem("trackerUserId");
const getToken = () => localStorage.getItem("trackerToken");
const user = getUserId()
export const getAllItems = createAsyncThunk("items/getAll", async (token, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Items/items`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
export const getAllItemsSearch = createAsyncThunk("items/getAllSearch", async ({ token, params }, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Items/items/search`, {
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
export const getOneItem = createAsyncThunk("items/getOne", async ({ id, token }, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Items/items/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addItem = createAsyncThunk("items/addOne", async ({ body, token, userId }, { rejectWithValue }) => {
    try {
        const formData = new FormData();

        Object.keys(body).forEach(key => {
            formData.append(key, body[key]);
        });

        const { data } = await axios.post(`${baseUrl}/Items/${userId || user}/items`, formData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        });
        notify('Item added successfully', 'success');
        return data;
    } catch (error) {
        notify('Failed to add item', 'error');
        return rejectWithValue(error.response.data);
    }
});
export const getUserItems = createAsyncThunk("items/getUserItems", async ({ token, userId }, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Items/${userId || user}/items`, {
            headers: {
                "Authorization": `Bearer ${token || getToken()}`,
            }
        });
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
export const updateItem = createAsyncThunk("items/updateOne", async ({ id, item, userId }, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`${baseUrl}/Items/${userId || user}/items/${id}`, item);
        notify('Item updated successfully', 'success');
        return data;
    } catch (error) {
        notify('Failed to update item', 'error');
        return rejectWithValue(error.response.data);
    }
});

export const deleteItem = createAsyncThunk("items/deleteOne", async ({ id, token, userId }, { rejectWithValue }) => {
    try {
        await axios.delete(`${baseUrl}/Items/${userId || user}/items/${id}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
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
            // Get All Items
            .addCase(getUserItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
            })
            .addCase(getUserItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Get All Items Search
            .addCase(getAllItemsSearch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllItemsSearch.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.data == null) {
                    state.items = []
                }
                state.items = action.payload.data;
            })
            .addCase(getAllItemsSearch.rejected, (state, action) => {
                state.loading = false;
                if (action.payload.data == null) {
                    state.items = []
                }
                state.error = action.payload || action.error.message;
            })
            // Get One Item
            .addCase(getOneItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOneItem.fulfilled, (state, action) => {
                state.loading = false;
                state.item = action.payload.data;
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
            .addCase(addItem.fulfilled, (state) => {
                state.loading = false;
                // state.items.push(action.payload);
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

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../utils/baseUrl";
import { toast } from "react-toastify";

const notify = (msg, type) => toast[type](msg);

export const getAllPersons = createAsyncThunk("persons/getAll", async (token, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Persons`, {
            headers: {
                "Authorization": "Bearer " + token
            },
        });
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
export const getAllPersonsSearch = createAsyncThunk("persons/getAllSearch", async ({ token, params }, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Persons/search`, {
            headers: {
                "Authorization": "Bearer " + token
            },
            params
        });
        return data;
    } catch (error) {
        console.log(error.response);
        return rejectWithValue(error.response.data);
    }
});

export const getOnePerson = createAsyncThunk("persons/getOne", async ({ id, token }, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Persons/${id}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addPerson = createAsyncThunk("persons/addOne", async ({ body, token }, { rejectWithValue }) => {
    try {
        const formData = new FormData();

        // Append each key-value pair from body to formData
        Object.entries(body).forEach(([key, value]) => {
            formData.append(key, value);
        });

        const { data } = await axios.post(`${baseUrl}/Persons`, formData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            }
        });
        notify('Person added successfully', 'success');
        console.log(data);
        return data;
    } catch (error) {
        notify('Failed to add person', 'error');
        console.log(error.response);
        return rejectWithValue(error.response.data);
    }
});


export const updatePerson = createAsyncThunk("persons/updateOne", async ({ id, person }, { rejectWithValue }) => {
    try {
        const { data } = await axios.put(`${baseUrl}/Persons/${id}`, person);
        notify('Person updated successfully', 'success');
        return data;
    } catch (error) {
        notify('Failed to update person', 'error');
        return rejectWithValue(error.response.data);
    }
});

export const deletePerson = createAsyncThunk("persons/deleteOne", async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`${baseUrl}/Persons/${id}`);
        notify('Person deleted successfully', 'success');
        return id;
    } catch (error) {
        notify('Failed to delete person', 'error');
        return rejectWithValue(error.response.data);
    }
});
const initialState = {
    persons: [],
    person: null,
    loading: false,
    error: null,
};

const personSlice = createSlice({
    name: "persons",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get All Persons
            .addCase(getAllPersons.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllPersons.fulfilled, (state, action) => {
                state.loading = false;
                state.persons = action.payload.data;
            })
            .addCase(getAllPersons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Get All Persons Search
            .addCase(getAllPersonsSearch.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllPersonsSearch.fulfilled, (state, action) => {
                state.loading = false;
                state.persons = action.payload.data;
            })
            .addCase(getAllPersonsSearch.rejected, (state, action) => {
                state.loading = false;
                if (action.payload.data == null) {
                    state.persons = []
                }
                state.error = action.payload || action.error.message;
            })
            // Get One Person
            .addCase(getOnePerson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getOnePerson.fulfilled, (state, action) => {
                state.loading = false;
                state.person = action.payload.data;
            })
            .addCase(getOnePerson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Add Person
            .addCase(addPerson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addPerson.fulfilled, (state) => {
                state.loading = false;
                // state.persons.push(action.payload);
            })
            .addCase(addPerson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Update Person
            .addCase(updatePerson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePerson.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.persons.findIndex(person => person.id === action.payload.id);
                if (index !== -1) {
                    state.persons[index] = action.payload;
                }
            })
            .addCase(updatePerson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            // Delete Person
            .addCase(deletePerson.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePerson.fulfilled, (state, action) => {
                state.loading = false;
                state.persons = state.persons.filter(person => person.id !== action.payload);
            })
            .addCase(deletePerson.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export default personSlice.reducer;

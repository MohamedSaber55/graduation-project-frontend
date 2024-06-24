import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ocrBaseUrl, frBaseUrl } from "../../utils/baseUrl";
import { toast } from "react-toastify";

const notify = (msg, type) => toast[type](msg);

export const faceRecognition = createAsyncThunk("faceRecognition", async (body, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        formData.append('file', body.file);
        const { data } = await axios.post(`${frBaseUrl}/fr`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(data);
        notify('Face recognition successful!', 'success'); return data;
    } catch (error) {
        notify('Face recognition failed!', 'error');
        return rejectWithValue(error.response.data);
    }
});
// export const faceRecognition = createAsyncThunk(
//     "faceRecognition",
//     async (body, { rejectWithValue }) => {
//         try {
//             const formData = new FormData();
//             formData.append("file", body.file);
//             const { data } = await axios.post(`${frBaseUrl}/classify_face`, formData, {
//                 headers: {
//                     "Content-Type": "multipart/form-data",
//                 },
//             });
//             notify("Face recognition successful!", "success");
//             return data;
//         } catch (error) {
//             notify("Face recognition failed!", "error");
//             return rejectWithValue(error.response.data);
//         }
//     }
// );
export const ocr = createAsyncThunk("ocr", async (body, { rejectWithValue }) => {
    try {
        const formData = new FormData();
        formData.append('image', body.file);
        const { data } = await axios.post(`${ocrBaseUrl}/ocr`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(data);
        if (data.error) {
            notify(data.error, 'error');
        } else {
            notify('OCR successful!', 'success');
        }
        return data;
    } catch (error) {
        notify('OCR failed!', 'error');
        return rejectWithValue(error.response.data);
    }
});


const initialState = {
    message: null,
    personsData: null,
    cardsData: null,
    loading: false,
    error: null,
};

const aiSlice = createSlice({
    name: "ai",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Face Recognition-----------------------------------------
            .addCase(faceRecognition.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(faceRecognition.fulfilled, (state, action) => {
                state.loading = false; ``
                state.personsData = action.payload.prediction;
            })
            .addCase(faceRecognition.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // ocr-----------------------------------------
            .addCase(ocr.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ocr.fulfilled, (state, action) => {
                state.loading = false;
                state.cardsData = action.payload.id
            })
            .addCase(ocr.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
    },
});

export default aiSlice.reducer;

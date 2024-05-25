import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import themeSlice from "./slices/themeSlice"
import itemSlice from "./slices/itemSlice";
import personsSlice from "./slices/personsSlice";
import commentSlice from "./slices/commentSlice";
import complianSlice from "./slices/complianSlice";
const store = configureStore({
    reducer: {
        user: authSlice,
        theme: themeSlice,
        items: itemSlice,
        persons: personsSlice,
        comments: commentSlice,
        complain: complianSlice,
    }
})

export default store
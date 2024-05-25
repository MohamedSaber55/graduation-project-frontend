import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import themeSlice from "./slices/themeSlice"
import itemSlice from "./slices/itemSlice";
import personsSlice from "./slices/personsSlice";
const store = configureStore({
    reducer: {
        user: authSlice,
        theme: themeSlice,
        items: itemSlice,
        persons: personsSlice,
    }
})

export default store
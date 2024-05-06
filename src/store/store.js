import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import themeSlice from "./slices/themeSlice"
const store = configureStore({
    reducer: {
        user: authSlice,
        theme: themeSlice,
    }
})

export default store
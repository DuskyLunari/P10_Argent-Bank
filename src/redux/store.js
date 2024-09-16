import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/auth.slice"; 
import profileReducer from "./features/profile/profile.slice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: profileReducer,
    }
});
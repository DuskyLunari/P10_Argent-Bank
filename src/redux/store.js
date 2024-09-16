import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./features/auth/auth.slice";
// import { profilReducer} from "./features/profile/profile.slice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        // user: profilReducer,
    }
})
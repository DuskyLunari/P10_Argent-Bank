import { createSlice } from "@reduxjs/toolkit";
import { logoutAction, loginAction } from "./auth.actions"

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        token: localStorage.getItem('token') || null,
        errorMessage: null,
        isLoading: false,
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAction.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = null;
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload;
                localStorage.setItem('token', action.payload);
            })
            .addCase(loginAction.rejected, (state, action) => {
                state.isLoading = false,
                    state.errorMessage = action.payload || "Incorrect username or password.";
            });
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
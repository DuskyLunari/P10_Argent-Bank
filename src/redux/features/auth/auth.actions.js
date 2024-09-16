import { createAsyncThunk } from "@reduxjs/toolkit";

export const logoutAction = (state) => {
    state.token = null;
    localStorage.removeItem('token');
}

export const loginAction = createAsyncThunk(
    "auth/login",
    async(entryPayload, { rejectWithValue }) => {
        try {
            const res = await fetch("http://localhost:3001/api/v1/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(entryPayload),
            });

            const data = await res.json();

            if (!res.ok) {
                return rejectWithValue(data.body?.message || "An error occurred");
            }

            localStorage.setItem('token', data.body?.token || "");
            return data.body?.token || "";
        } catch (error) {
            return rejectWithValue("An unexpected error occurred");
        }
    }
);
import { createAsyncThunk } from "@reduxjs/toolkit";

export const logoutAction = (state) => {
    state.token = null;
}

export const loginAction = createAsyncThunk(
    "auth/login",
    async(entryPayload, { rejectWithValue }) => {
        const res = await fetch("http://localhost:3001/api/v1/user/profile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(entryPayload),
        });

        const data = await res.json();

        if (!res.ok) {
            return rejectWithValue(data.body.message);
        }

        return data.body.token;
    }
);

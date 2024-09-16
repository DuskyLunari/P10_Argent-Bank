import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk(
    "user/getUser",
    async (_, { rejectWithValue }) => {
        const token = localStorage.getItem('token');

        if (!token) {
            return rejectWithValue("No token found");
        }

        try {
            const res = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });

            const data = await res.json();
            console.log("API Response:", data);

            if (!res.ok) {
                return rejectWithValue(data.message || "An error occurred");
            }

            return data;
        } catch (error) {
            return rejectWithValue("Network error");
        }
    }
);

export const editUser = createAsyncThunk(
    "user/editUser",
    async (userPayload, { rejectWithValue }) => {
        const res = await fetch("http://localhost:3001/api/v1/user/profile", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userPayload),
        });

        const data = await res.json();

        if (!res.ok) {
            return rejectWithValue(data.body.message);
        }

        return data.body;
    }
);
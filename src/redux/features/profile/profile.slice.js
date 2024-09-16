import { createSlice } from "@reduxjs/toolkit";
import { editUser, getUser } from "./profile.actions";

const initialState = {
    email: "",
    firstName: "",
    lastName: "",
    userName: "",
    id: "",
    createdAt: "",
    updatedAt: "",
    errorMessage: null,
    isLoading: false,
};

const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            return { ...state, ...action.payload };
        },
        clearUser: (state) => {
            return { ...initialState };
        },
        updateUserName: (state, action) => {
            state.userName = action.payload;
        },
        updateEmail: (state, action) => {
            state.email = action.payload;
        },
        updateFirstName: (state, action) => {
            state.firstName = action.payload;
        },
        updateLastName: (state, action) => {
            state.lastName = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = null;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.id = action.payload.body.id;
                state.email = action.payload.body.email;
                state.firstName = action.payload.body.firstName;
                state.lastName = action.payload.body.lastName;
                state.userName = action.payload.body.userName;
                state.createdAt = action.payload.body.createdAt;
                state.updatedAt = action.payload.body.updatedAt;
            })
            .addCase(getUser.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload || "Failed to fetch user details";
            })
            .addCase(editUser.pending, (state) => {
                state.isLoading = true;
                state.errorMessage = null;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.email = action.payload.email;
                state.firstName = action.payload.firstName;
                state.lastName = action.payload.lastName;
                state.userName = action.payload.userName;
            })
            .addCase(editUser.rejected, (state, action) => {
                state.isLoading = false;
                state.errorMessage = action.payload || "Failed to update profile";
            });
    }
});

export const { setUser, clearUser, updateUserName, updateEmail, updateFirstName, updateLastName } = UserSlice.actions;
export default UserSlice.reducer;
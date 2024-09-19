import { createSlice } from "@reduxjs/toolkit";
import { getUser, editUser } from "./profile.actions.js";

const initialState = {
  userName: "",
  firstName: "",
  lastName: "",
  isLoading: false,
  isEditing: false,
};

const profileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleIsEditing: (state) => {
      state.isEditing = !state.isEditing;
    },
    updateUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userName = action.payload.body.userName;
        state.firstName = action.payload.body.firstName;
        state.lastName = action.payload.body.lastName;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.userName = action.payload.userName;
      });
  },
});

export const { toggleIsEditing, updateUserName } = profileSlice.actions;
export default profileSlice.reducer;
import { IUserData } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsersState {
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUserRequest(state, action: PayloadAction<Partial<IUserData>>) {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess(state, action: PayloadAction<Partial<IUserData>>) {
      state.loading = false;
    },
    updateUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { updateUserRequest, updateUserSuccess, updateUserFailure } =
  usersSlice.actions;

export default usersSlice.reducer;

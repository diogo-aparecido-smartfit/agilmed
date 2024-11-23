import { IUserData } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UsersState {
  loading: boolean;
  error: string | null;
  imageUploadLoading: boolean;
  imageUploadError: string | null;
}

const initialState: UsersState = {
  loading: false,
  error: null,
  imageUploadLoading: false,
  imageUploadError: null,
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

    uploadProfilePictureRequest(
      state,
      action: PayloadAction<{
        uri: string;
        userId: number | undefined;
      }>
    ) {
      state.imageUploadLoading = true;
      state.imageUploadError = null;
    },
    uploadProfilePictureSuccess(state) {
      state.imageUploadLoading = false;
      state.imageUploadError = null;
    },
    uploadProfilePictureFailure(state, action: PayloadAction<string>) {
      state.imageUploadLoading = false;
      state.imageUploadError = action.payload;
    },
  },
});

export const {
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  uploadProfilePictureFailure,
  uploadProfilePictureRequest,
  uploadProfilePictureSuccess,
} = usersSlice.actions;

export default usersSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    profile: null,
    name: null,
    meetingid: null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.profile = action.payload.profile;
      state.meetingid = action.payload.meetingid;
      state.token = action.payload.token;
    },
    logoutUser: (state, action) => {
      state.email = null;
      state.name = null;
      state.profile = null;
      state.meetingid = null;
      state.token = null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;

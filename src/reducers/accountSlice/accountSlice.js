import { getUserById, getUsers } from "@/api/accountAPI/accountAPI";
import { createSlice } from "@reduxjs/toolkit";
export const accountSlice = createSlice({
  name: "accountSlice",
  initialState: {
    account: {},
    users: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.fulfilled, (state, actions) => {

        state.account = actions.payload;
      })
      .addCase(getUsers.fulfilled, (state, actions) => {
        state.users = actions.payload?.data;
      });
  },
});

export const {} = accountSlice.actions;
export default accountSlice.reducer;

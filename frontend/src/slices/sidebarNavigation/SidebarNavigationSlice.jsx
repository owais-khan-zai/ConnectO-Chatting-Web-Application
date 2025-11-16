import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: "Chat",
  previousTab: null,
};

const sidebarNavigationSlice = createSlice({
  name: "sidebarNavigation",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.previousTab = state.activeTab;
      state.activeTab = action.payload;
    },
  },
});

export const { setActiveTab } = sidebarNavigationSlice.actions;
export default sidebarNavigationSlice.reducer;

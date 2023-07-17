import { configureStore } from "@reduxjs/toolkit";
import themeModeSlice from "./themeModeSlide";
import userSlice from "./userSlice";
import authModalSlice from "./authModalSlice";
import globalLoadingSlice from "./globalLoadingSlice";
import appStateSlice from "./appStateSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    themeMode: themeModeSlice,
    authModal: authModalSlice,
    globalLoading: globalLoadingSlice,
    appState: appStateSlice
  },
});

export default store;

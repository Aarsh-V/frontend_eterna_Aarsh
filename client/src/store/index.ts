import { configureStore } from "@reduxjs/toolkit";
import pulseReducer from "./pulseSlice";

export const store = configureStore({
  reducer: {
    pulse: pulseReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Price updates may contain complex objects; skip checks that are noisy
        ignoredActions: ["pulse/updatePrice"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

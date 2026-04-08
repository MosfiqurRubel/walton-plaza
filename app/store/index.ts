import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@/app/store/services/baseApi";
import cartReducer from "@/app/store/slices/cartSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer, // RTK Query reducer for API caching and state management
    cart: cartReducer, // Reducer for managing cart state
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

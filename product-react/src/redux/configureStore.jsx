import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer from "./reducers/ProductsReducer";
import UserReducer from "./reducers/UserReducer";

export const store = configureStore({
  reducer: {
    ProductsReducer,
    UserReducer,
  },
});

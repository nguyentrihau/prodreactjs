import { createSlice } from "@reduxjs/toolkit";
import { history } from "../../App";
import { http } from "../../util/config";

const initialState = {
  arrProducts: null,
  productID: null,
};

const ProductsReducer = createSlice({
  name: "productsReducer",
  initialState,
  reducers: {
    getProductAction: (state, action) => {
      state.arrProducts = action.payload;
    },
    getProductID: (state, action) => {
      state.productID = action.payload;
    },
  },
});

export const { getProductAction, getProductID } = ProductsReducer.actions;

export default ProductsReducer.reducer;

/** -------------- async action ------------- */
export const getArrProductsApi = async (dispatch) => {
  try {
    const result = await http.get("/products");
    const action = getProductAction(result.data);
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};
export const getProductIdApi = (id) => {
  return async (dispatch) => {
    try {
      const result = await http.get(`/products/${id}`);
      const action = getProductID(result.data);
      dispatch(action);
      history.push("/edit");
    } catch (error) {
      console.log(error);
    }
  };
};
export const postProductApi = (data) => {
  return async () => {
    try {
      await http.post(`/products`, data);
      alert("more success");
    } catch (error) {
      console.log(error);
    }
  };
};
export const putProductApi = (data, id) => {
  return async () => {
    try {
      const result = await http.put(`/products/${id}`, data);
      alert("update success");
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
};
export const deleteProductApi = (id) => {
  return async (dispatch) => {
    try {
      const result = await http.delete(`/products/${id}`);
      // alert("update success");
      dispatch(getArrProductsApi);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
};

import { createSlice } from "@reduxjs/toolkit";
import { history } from "../../App";
import { http, luuStoreJson, USER_LOGIN } from "../../util/config";

const initialState = {
  profile: null,
};

const UserReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getProfileAction: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { getProfileAction } = UserReducer.actions;

export default UserReducer.reducer;

/** -------------- async action ------------- */
export const postLoginApi = (userLogin) => {
  return async (dispatch) => {
    try {
      const result = await http.post("/login", userLogin);
      const action = getProfileAction(result.data?.user);
      console.log(result);
      if (result?.data?.success === false)
        return alert("email or password is incorrect");
      luuStoreJson(USER_LOGIN, result.data.token);
      dispatch(action);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
};

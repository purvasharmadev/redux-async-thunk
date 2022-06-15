import { createSlice } from "@reduxjs/toolkit";

const intialStateValue = {
  value: [
    {
      id: 1,
      title: "post-1",
      content:
        "lorem ipsum lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum"
    },
    {
      id: 2,
      title: "post-2",
      content:
        "lorem ipsum lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum"
    },
    {
      id: 3,
      title: "post-3",
      content:
        "lorem ipsum lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum"
    }
  ]
};
export const postSlice = createSlice({
  name: "post",
  initialState: intialStateValue,
  reducers: {
    postList: (state) => {
      return state.value;
    },
    postAdd: (state, action) => {
      state.value = [...state.value, action.payload];
    }
  }
});

export const { postAdd } = postSlice.actions;

export default postSlice.reducer;

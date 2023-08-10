import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const httpClient = axios.create({baseURL: 'http://localhost:5000/api'})

interface IUsersState {
  users: string[];
  isFetching: boolean;
  error: string | null | undefined | unknown;
}

export const getUsersThunk = createAsyncThunk("users/get", 
  async (payload, { rejectWithValue }) => {
    try {
      const {data} = await httpClient.get('/users')
      return data // => action.payload
    } catch (error) {
      console.log('error =>', error)
      return rejectWithValue({ message: error })
    }
  }
);

const initialState: IUsersState = {
  users: [],
  isFetching: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersThunk.pending, (state,) => {
        state.isFetching = true
        state.error = null
      })
      .addCase(getUsersThunk.fulfilled, (state, {payload}) => {
        state.isFetching = false
        state.users = payload
      })
      .addCase(getUsersThunk.rejected, (state, {payload}) => {
        state.isFetching = false
        state.error = payload
      })

  },
});

const { reducer } = usersSlice;
export default reducer;
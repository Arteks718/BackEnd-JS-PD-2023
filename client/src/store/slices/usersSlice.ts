import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IUsersState } from '../../types'

const httpClient = axios.create({baseURL: 'http://localhost:5000/api'})

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

export const deleteUsersThunk = createAsyncThunk("users/delete",
  async (userId:number, { rejectWithValue }) => {
    try {
      await httpClient.delete(`/users/${userId}`)
      return userId
    } catch (error) {
      console.log('error =>', error)
      return rejectWithValue({message: error})
    }
  }
)

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
    // GET
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
    // DELETE
    builder
      .addCase(deleteUsersThunk.pending, (state) => {
        state.isFetching = true
        state.error = null
      })
      .addCase(deleteUsersThunk.fulfilled, (state, {payload}) => {
        state.isFetching = false
        const deleteUsersIndex = state.users.findIndex(user => user.id === Number(payload))
        state.users.splice(deleteUsersIndex, 1)
      })
      .addCase(deleteUsersThunk.rejected, (state, {payload}) => {
        state.isFetching = false
        state.error = payload
      })
  },
});

const { reducer } = usersSlice;
export default reducer;
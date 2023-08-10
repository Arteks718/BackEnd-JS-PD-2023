import { createSlice } from "@reduxjs/toolkit";

interface IUsersState {
  users: string[],
  isFetching: boolean, 
  error: string | null
}

const initialState:IUsersState = {
  users: [],
  isFetching: false,
  error: null
}

const usersSlice = createSlice({
  name: 'users',
  initialState, 
  reducers: {
    
  },
})

const { reducer } = usersSlice

export default reducer
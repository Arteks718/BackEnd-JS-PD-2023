import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getHttpTasks } from '../../api'
import { ITasksState } from '../../types'

export const getTasksThunk = createAsyncThunk("tasks/get", 
  async (payload, {rejectWithValue}) => {
    try {
      const { data } = await getHttpTasks()
      return data
    } catch (error) {
      console.log('error =>', error)
      return rejectWithValue(error)
    }
  }
)

const initialState:ITasksState = {
  tasks: [],
  isFetching: false, 
  error: null
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => { 
    builder
      .addCase(getTasksThunk.pending, (state) => {
        state.isFetching = true
        state.error = null
      })
      .addCase(getTasksThunk.fulfilled, (state, {payload}) => {
        state.isFetching = false
        state.tasks = payload
      })
      .addCase(getTasksThunk.rejected, (state, {payload}) => {
        state.isFetching = false
        state.error = payload
      })
  }
})

const { reducer } = tasksSlice

export default reducer
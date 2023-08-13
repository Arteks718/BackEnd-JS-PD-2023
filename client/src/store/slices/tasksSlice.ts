import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHttpTasks, deleteHttpTask } from "../../api";
import { ITasksState } from "../../types";

export const getTasksThunk = createAsyncThunk(
  "tasks/get",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await getHttpTasks();
      return data;
    } catch (error) {
      const { message }: any = error;
      console.log("error =>", message);
      return rejectWithValue(message);
    }
  }
);

export const deleteTaskThunk = createAsyncThunk(
  "tasks/delete",
  async (taskId: number, { rejectWithValue }) => {
    try {
      await deleteHttpTask(taskId);
      return taskId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: ITasksState = {
  tasks: [],
  isFetching: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasksThunk.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(getTasksThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.tasks = payload;
      })
      .addCase(getTasksThunk.rejected, (state, { payload }) => {
        state.isFetching = false;
        state.error = payload;
      });
    builder
      .addCase(deleteTaskThunk.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(deleteTaskThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false
        const findDeleteIndex = state.tasks.findIndex(task => {
          return task.id === Number(payload)
        })
        state.tasks.splice(findDeleteIndex, 1)
      })
      .addCase(deleteTaskThunk.rejected, (state, { payload }) => {
        state.isFetching = false
        state.error = payload
      });
  },
});

const { reducer } = tasksSlice;

export default reducer;

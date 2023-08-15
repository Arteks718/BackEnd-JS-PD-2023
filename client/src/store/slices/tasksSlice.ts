import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getHttpTasks, deleteHttpTask, createHttpTask } from "../../api";
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

export const addNewTaskThunk = createAsyncThunk(
  "tasks/post",
  async(payload, { rejectWithValue }) => {
    try {
      // await createHttpTask(payload)
      console.log("asdadasd")
    } catch (error) {
      const { message }: any = error;
      console.log("error =>", message);
      return rejectWithValue(message);
    }
  }
)

export const deleteTaskThunk = createAsyncThunk(
  "tasks/delete",
  async (taskId: number, { rejectWithValue }) => {
    try {
      const isDeleteTask = window.confirm("Delete task?")
      if(!isDeleteTask) {
        return
      } else {
        await deleteHttpTask(taskId);
        return taskId;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: ITasksState = {
  tasks: [],
  isFetching: false,
  error: null,
  isEmpty: false,
  isOpenNewTask: false
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    isOpenNewTaskWindow: (state) => {
      state.isOpenNewTask = state.isOpenNewTask ? false : true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasksThunk.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(getTasksThunk.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isEmpty = state.tasks.length === 0 ? true : false;
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
        if(payload === undefined) {
          return
        }
        const findDeleteIndex = state.tasks.findIndex(task => {
          return task.id === Number(payload)
        })
        state.tasks.splice(findDeleteIndex, 1)
      })
      .addCase(deleteTaskThunk.rejected, (state, { payload }) => {
        state.isFetching = false
        state.error = payload
      });
    builder
      .addCase(addNewTaskThunk.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(addNewTaskThunk.fulfilled, (state, { payload }) => {
        console.log("asdasdasdasdas")
      })
      .addCase(addNewTaskThunk.rejected, (state, {payload}) => {
        state.isFetching = false;
        state.error = payload;
      })
  },
});

const { reducer } = tasksSlice;

export const { isOpenNewTaskWindow } = tasksSlice.actions

export default reducer;

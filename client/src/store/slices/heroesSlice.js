import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const httpClient = axios.create({ baseURL: "http://localhost:5000/api/" });

const initialState = {
  heroes: [],
  isFetching: false,
  error: null,
};

const HEROES_SLICE_NAME = 'heroes'

export const getHeroesThunk = createAsyncThunk(
  `${HEROES_SLICE_NAME}/get`,
  async (payload, { rejectWithValue }) => {
    try {
      const { data: { data: gettingData}}  = await httpClient.get(`/${HEROES_SLICE_NAME}`);
      return gettingData// => action.payload
    } catch (error) {
      return rejectWithValue({message: error.message})
    }
  }
);

export const deleteHeroThunk = createAsyncThunk(
  `${HEROES_SLICE_NAME}/delete`,
  async (payload, rejectWithValue) => { // => id
    try {
      await httpClient.delete(`/${HEROES_SLICE_NAME}/${payload}`)
      return payload
    } catch (error) {
      return rejectWithValue({message: error.message})
    }
  }
)

export const updateHeroThunk = createAsyncThunk(
  `${HEROES_SLICE_NAME}/update`,
  async (payload, {rejectWithValue}) => {
    try {
      const { data: { data: updatedHero }} = await httpClient.patch(`/${HEROES_SLICE_NAME}/${payload.id}`, payload.updatedData)
      // console.log('updatedHero', updatedHero)
      return updatedHero
    } catch (error) {
      console.log(error)
      return rejectWithValue({message: error.message})
    }
  }
)

const heroesSlice = createSlice({
  name: `${HEROES_SLICE_NAME}`,
  initialState,
  extraReducers: builder => {
    //builder.addCase('heroes/get/pending')
    //GET
    builder.addCase(getHeroesThunk.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    })
    builder.addCase(getHeroesThunk.fulfilled, (state, {payload}) => {
      state.isFetching = false;
      state.heroes = [...payload]
    })
    builder.addCase(getHeroesThunk.rejected, (state, {payload}) => {
      state.isFetching = false;
      state.error = payload
    })
    //DELETE
    builder.addCase(deleteHeroThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    })
    builder.addCase(deleteHeroThunk.fulfilled, (state, {payload}) => {
      const deletedHeroIndex = state.heroes.findIndex(
        h => h.id === payload
      )
      state.heroes.splice(deletedHeroIndex, 1)
      state.isFetching = false;
    })
    builder.addCase(deleteHeroThunk.rejected, (state, {payload}) => {
      state.isFetching = false;
      state.error = payload
    })
    //PATCH
    builder.addCase(updateHeroThunk.pending, (state) => {
      state.isFetching = true;
      state.error = null;
    })
    builder.addCase(updateHeroThunk.fulfilled, (state, {payload}) => {
      state.isFetching = false;
      const updatedHeroIndex = state.heroes.findIndex(
        h => h.id === payload.id
      )
      state.heroes[updatedHeroIndex] = { ...payload }
    })
    builder.addCase(updateHeroThunk.rejected, (state, {payload}) => {
      state.isFetching = false; 
      state.error = payload
    })
  }
});

export default heroesSlice.reducer;

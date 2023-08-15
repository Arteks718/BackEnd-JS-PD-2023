import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createHttpHeroes, getHttpHeroes, updateHttpHeroes, deleteHttpHeroes } from "../../api";

const HEROES_SLICE_NAME = 'heroes'
const initialState = {
  heroes: [],
  isFetching: false,
  error: null,
};


export const createHeroThunk = createAsyncThunk(
  `${HEROES_SLICE_NAME}/create`,
  async (payload, {rejectWithValue}) => {
    try {
      const { data: {data: createdHero}} = await createHttpHeroes(payload)
      return createdHero
    } catch (error) {
      return rejectWithValue({message: error.message})
    }
  }
)

export const getHeroesThunk = createAsyncThunk(
  `${HEROES_SLICE_NAME}/get`,
  async (payload, { rejectWithValue }) => {
    try {
      const { data: { data: gettingData}}  = await getHttpHeroes()
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
      await deleteHttpHeroes(payload)
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
      const { data: { data: updatedHero }} = await updateHttpHeroes(payload)
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
    // CREATE
    builder
      .addCase(createHeroThunk.pending, (state) => {
        state.isFetching = true
        state.error = null
      })
      .addCase(createHeroThunk.fulfilled, (state, {payload}) => {
        state.isFetching = false
        state.heroes.push(payload)
      })
      .addCase(createHeroThunk.rejected, (state, {payload}) => {
        state.isFetching = false
        state.error = payload
      })
    //GET
    builder
      .addCase(getHeroesThunk.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(getHeroesThunk.fulfilled, (state, {payload}) => {
        state.isFetching = false;
        state.heroes = [...payload]
      })
      .addCase(getHeroesThunk.rejected, (state, {payload}) => {
        state.isFetching = false;
        state.error = payload
      })
    //DELETE
    builder
      .addCase(deleteHeroThunk.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(deleteHeroThunk.fulfilled, (state, {payload}) => {
        const deletedHeroIndex = state.heroes.findIndex(
          h => h.id === payload
        )
        state.heroes.splice(deletedHeroIndex, 1)
        state.isFetching = false;
      })
      .addCase(deleteHeroThunk.rejected, (state, {payload}) => {
        state.isFetching = false;
        state.error = payload
      })
    //PATCH
    builder
      .addCase(updateHeroThunk.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(updateHeroThunk.fulfilled, (state, {payload}) => {
        state.isFetching = false;
        const updatedHeroIndex = state.heroes.findIndex(
          h => h.id === payload.id
        )
        state.heroes[updatedHeroIndex] = { ...payload }
      })
      .addCase(updateHeroThunk.rejected, (state, {payload}) => {
        state.isFetching = false; 
        state.error = payload
      })
  }
});

export default heroesSlice.reducer;

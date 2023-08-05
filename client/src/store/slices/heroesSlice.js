import axios from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const httpClient = axios.create({baseURL: 'http://localhost:5000/api/'})

const initialState = {
  heroes: [],
  isFetching: false,
  error: null,
};

export const getHeroesThunk = createAsyncThunk(
  "heroes/get",
  async (payload) => {
    try {
      console.log('getHeroesThunk')
      const gettingData = await httpClient.get('/heroes')
      console.log('gettingData', gettingData)
    } catch (error) {
      
    }
  }
);

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
});

export default heroesSlice.reducer;

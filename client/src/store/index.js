import { configureStore } from '@reduxjs/toolkit'
import heroesReducer from './slices/heroesSlice'
const reducer = {
  heroData: heroesReducer,
  // powersData: powersReducer
}

const store = configureStore({reducer})

export default store
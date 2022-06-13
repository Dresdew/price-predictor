import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import featuresReducer from './slices/featuresSlice'
import errorReducer from './slices/errorSlice'
import priceReducer from './slices/priceSlice'

const reducer = combineReducers({
    features: featuresReducer,
    error: errorReducer,
    price: priceReducer,
})
const store = configureStore({ reducer })

export default store
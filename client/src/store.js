import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import featuresReducer from './slices/featuresSlice'
import errorReducer from './slices/errorSlice'

const reducer = combineReducers({
    features: featuresReducer,
    error: errorReducer
})
const store = configureStore({ reducer })

export default store
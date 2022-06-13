import { createSlice } from '@reduxjs/toolkit'

const priceSlice = createSlice({
    name: 'price',
    initialState: { predictedPrice: null },
    reducers: {
        setPrice(state, action) {
            state.predictedPrice = action.payload.predictedPrice
        },
    }
})

export const { setPrice } = priceSlice.actions
export default priceSlice.reducer
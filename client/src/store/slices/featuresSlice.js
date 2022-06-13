import { createSlice } from '@reduxjs/toolkit'

const featuresSlice = createSlice({
    name: 'features',
    initialState: { features: [], dataFetched: false },
    reducers: {
        setFeatures(state, action) {
            state.features = action.payload.features;
            state.dataFetched = true;
        },
    }
})

export const { setFeatures } = featuresSlice.actions
export default featuresSlice.reducer

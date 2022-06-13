import { createSlice } from '@reduxjs/toolkit'

const errorSlice = createSlice({
    name: 'error',
    initialState: { message: null },
    reducers: {
        setError(state, action) {
            state.message = action.payload.error;
        },

    }
})

export const { setError } = errorSlice.actions
export default errorSlice.reducer

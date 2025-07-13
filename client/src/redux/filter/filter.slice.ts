import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    category: '',
    theme: '',
    title: 'asc',
    year: 'asc',
    page: null
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategory(state, action: PayloadAction<string>) {
            state.category = action.payload
        }
    }
})

export const { setCategory } = filterSlice.actions

export default filterSlice.reducer
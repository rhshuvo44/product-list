import { createSlice } from '@reduxjs/toolkit'

export type ProductState = {
    products: string[]
}

const initialState: ProductState = {
    products: []
}

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {

    },
})

// Action creators are generated for each case reducer function
// export const { } = productSlice.actions

export default productSlice.reducer
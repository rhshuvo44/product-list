import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    category: string,
    brand: string

}

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
    endpoints: (builder) => ({
        getProducts: builder.query<{ products: Product[]; total: number }, { limit: number; skip: number }>({
            query: ({ limit, skip }) => ({ url: `products?limit=${limit}&skip=${skip}`, method: 'GET' }),
        }),
        getProduct: builder.query<Product, number>({
            query: (id) => `products/${id}`,
        }),
    }),
})

export const { useGetProductsQuery, useGetProductQuery } = baseApi
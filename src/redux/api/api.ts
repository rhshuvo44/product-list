import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    category: string,
    brand: string,
    sku: string
    stock: number;
    rating: number
    tags: string[]
    images: string[];
    reviews: {
        rating: number,
        comment: string,
        reviewerName: string,
    }[];

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
        getCategories: builder.query<string[], void>({
            query: () => `products/categories`,
        }),
        updateProduct: builder.mutation<Product, { id: number; data: Partial<Product> }>({
            query: ({ id, data }) => ({
                url: `products/${id}`,
                method: 'PATCH',
                body: data,
            }),
        })
    }),
})

export const { useGetProductsQuery, useGetProductQuery, useGetCategoriesQuery, useUpdateProductMutation } = baseApi
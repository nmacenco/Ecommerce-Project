import { Product, ProductActions, TYPES_PRODUCT } from "../interface";


export interface PRODUCTS {
    products: Product[],
    orderedProducts: Product[],
    productSearch: any
}

const INITIAL_STATE = {
    products: [],
    orderedProducts: [],
    productSearch: []
}

export const reducerProduct = (state: PRODUCTS = INITIAL_STATE, action: ProductActions): PRODUCTS => {
    switch (action.type) {
        case TYPES_PRODUCT.GET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                orderedProducts: action.payload
            }

        default: {
            return {
                ...state
            }
        }
    }
};
import { Product, ProductActions, TYPES_PRODUCT } from "../interface";


export interface PRODUCTS {
    products: Product[],
    productSearch: any
}

const INITIAL_STATE = {
    products: [],
    productSearch: []
}

export const reducerProduct = (state: PRODUCTS = INITIAL_STATE, action: ProductActions): PRODUCTS => {
    switch (action.type) {
        case TYPES_PRODUCT.GET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }

        default: {
            return {
                ...state
            }
        }
    }
};
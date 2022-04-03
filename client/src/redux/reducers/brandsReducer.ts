import {TYPES_BRANDS, Brand , BrandsActions} from "../interface";

export interface BRANDS {
    brands: Brand[],
}

const INITIAL_STATE = {
    brands: [],
}

export const reducerBrands = (state: BRANDS = INITIAL_STATE, action: BrandsActions): BRANDS => {
    switch (action.type) {
        case TYPES_BRANDS.GET_BRANDS :
            return {
                ...state,
                brands: action.payload
            }
        default: {
            return {
                ...state
            }
        }
    }
};
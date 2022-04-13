import { Product, ProductActions, TYPES_PRODUCT } from "../interface";

export interface FILTERED_STATE {
  copyFilteredProducts: Product[];
  filteredProducts: Product[];
}

const INITIAL_STATE: FILTERED_STATE = {
  copyFilteredProducts: [],
  filteredProducts: [],
};

export const reducerFilterProducts = (
  state: FILTERED_STATE = INITIAL_STATE,
  action: ProductActions
): FILTERED_STATE => {
  switch (action.type) {
    // case TYPES_PRODUCT.CHARGE_FILTERS:
    //   return {
    //     ...state,
    //     filteredProducts: action.payload,
    //     copyFilteredProducts: action.payload
    //   }

    // case TYPES_PRODUCT.REMOVE_FILTER:
    //   let removed: Product[] = []
    //   let removedCatFilter = state.copyFilteredProducts.filter((e: any) => e.subcategory === action.payload.toString())
    //   if (removedCatFilter.length !== 0) { removed = removedCatFilter }
    //   else { removed = state.copyFilteredProducts.filter((e: any) => e.brand === action.payload.toString()) }
    //   return {
    //     ...state,
    //     filteredProducts: removed
    //   }

    // case TYPES_PRODUCT.FILTERED_CAT_PRODUCTS:
    //   const newFilter = state.filteredProducts.filter((e: any) => e.subcategory === action.payload)

    //   return {
    //     ...state,
    //     filteredProducts: newFilter
    //   }

    // case TYPES_PRODUCT.FILTERED_BRAND_PRODUCTS:
    //   const newFilterBrand = state.filteredProducts.filter((e: any) => e.brand === action.payload)

    //   return {
    //     ...state,
    //     filteredProducts: newFilterBrand
    //   }

    // case TYPES_PRODUCT.SEARCH_PRODUCTS:
    //   return {
    //     ...state,
    //     filteredProducts: action.payload
    //   }

    // case TYPES_PRODUCT.PRODUCT_NOT_FOUND:
    //   let arr: Product[] = []
    //   if (action.payload === false) {
    //     arr = state.copyFilteredProducts
    //   }

    //   return {
    //     ...state,
    //     filteredProducts: arr
    //   }

    // case TYPES_PRODUCT.RESET_FILTERED_PRODUCTS:
    //   return {
    //     ...state,
    //     filteredProducts: [],
    //     copyFilteredProducts: []

    //   }



    // case TYPES_PRODUCT.SEARCH_PRODUCTS:

    //     return {
    //       ...state,
    //       filteredProducts: action.payload,
    //     };


    default: {
      return { ...state };
    }
  }
};

import { Product, ProductActions, TYPES_PRODUCT } from "../interface";

export interface FILTERED_STATE {
  filteredProducts: Product[];

}

const INITIAL_STATE: FILTERED_STATE = {
  filteredProducts: [],
};

export const reducerFilterProducts = (
  state: FILTERED_STATE = INITIAL_STATE,
  action: ProductActions
): FILTERED_STATE => {
  switch (action.type) {
    case TYPES_PRODUCT.FILTERED_PRODUCTS:
      let allProducts : Product[] = action.payload.products
      const filteredProducts = allProducts.filter(
        (product) =>
          product.subcategory === action.payload.value 
      );
      return {
        ...state,
        filteredProducts: filteredProducts
      };
    case TYPES_PRODUCT.RESET_FILTERED_PRODUCTS :
        return {
            ...state,
            filteredProducts: []
        }
    default: {
      return { ...state };
    }
  }
};

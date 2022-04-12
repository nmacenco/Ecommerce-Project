import { AdminActions, Product, TYPES_ADMIN } from "../interface";

export interface PRODUCTS {
  products: Product[];
  orderedProducts: Product[];
}


const INITIAL_STATE = {
  products: [],
  orderedProducts: [],
};

export const reducerProduct = (
  state: PRODUCTS = INITIAL_STATE,
  action: AdminActions
): PRODUCTS => {
  switch (action.type) {
    case TYPES_ADMIN.DELETE_PRODUCTS:
      return {
        ...state,
        products: state.products.filter((p: Product) => p.id !== action.payload),
        orderedProducts: state.orderedProducts.filter((p: Product) => p.id !== action.payload),
      };

    default: {
      return {
        ...state,
      };
    }
  }
};
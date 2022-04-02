import HashTable from "../../helpers/hashTable";
import { Product, ProductActions, TYPES_PRODUCT } from "../interface";

export interface PRODUCTS {
  products: Product[];
  productSearch: any;
}

const INITIAL_STATE = {
  products: [],
  productSearch: [],
};

export const reducerProduct = (
  state: PRODUCTS = INITIAL_STATE,
  action: ProductActions
): PRODUCTS => {
  switch (action.type) {
    case TYPES_PRODUCT.GET_PRODUCTS:
      const newTable = new HashTable();

      action.payload.forEach((product) => {
        newTable.addItem(product.name);
      });

      return {
        ...state,
        products: action.payload,
        productSearch: newTable,
      };

    default: {
      return {
        ...state,
      };
    }
  }
};

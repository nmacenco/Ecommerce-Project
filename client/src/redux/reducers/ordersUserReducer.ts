import HashTable from "../../helpers/hashTable";
import { Product, ProductActions, TYPES_PRODUCT } from "../interface";

export interface PRODUCTS {
  products: Product[];
  copyProducts: Product[];
  productSearch: any;
  not_found: boolean
}

const INITIAL_STATE = {
  products: [],
  copyProducts: [],
  productSearch: [],
  not_found: false,
};

export const reducerProduct = (
  state: PRODUCTS = INITIAL_STATE,
  action: ProductActions
): PRODUCTS => {
  switch (action.type) {
    case TYPES_PRODUCT.GET_PRODUCTS:
      const newTable = new HashTable();

      action.payload.forEach((product) => {
        // console.log("ADD ITEM",product.name);
        newTable.addItem(product.name);
      });
      // console.log("La hastable es: ", newTable);

      return {
        ...state,
        products: action.payload,
        copyProducts: action.payload,
        productSearch: newTable,
      };

    case TYPES_PRODUCT.RESET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        copyProducts: action.payload,
      }

    default: {
      return {
        ...state,
      };
    }
  }
};
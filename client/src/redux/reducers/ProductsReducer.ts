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
    // case TYPES_PRODUCT.FILTERED_CAT_PRODUCTS:
    //   let allProducts: Product[] = state.copyProducts
    //   const filteredProducts = allProducts.filter(
    //     (product) =>
    //       product.subcategory === action.payload
    //   );
    //   return {
    //     ...state,
    //     products: filteredProducts
    //   };
    // case TYPES_PRODUCT.FILTER_BY_BRAND:
    //   let allProduct: Product[] = state.copyProducts

    //   const filteredByBrand = allProduct.filter(
    //     (product) =>
    //       product.brand === action.payload
    //   );
    //   return {
    //     ...state,
    //     products: filteredByBrand
    //   };
    // case TYPES_PRODUCT.SEARCH_PRODUCTS:

    //   return {
    //     ...state,
    //     products: action.payload,
    //   };
    // case TYPES_PRODUCT.PRODUCT_NOT_FOUND:

    //   return {
    //     ...state,
    //     not_found: action.payload,
    //   };
    default: {
      return {
        ...state,
      };
    }
  }
};

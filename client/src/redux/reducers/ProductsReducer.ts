import HashTable from "../../helpers/hashTable";
import { Product, ProductActions, TYPES, TYPES_PRODUCT } from "../interface";

export interface PRODUCTS {
  products: Product[];
  productSearch: any;
}

const INITIAL_PRODUCTS: PRODUCTS = {
  products: [],
  productSearch: new HashTable(),
};

const reducerProduct = (
  state: PRODUCTS = INITIAL_PRODUCTS,
  action: ProductActions
) => {
  switch (action.type) {
    case TYPES_PRODUCT.GET_PRODUCTS:
      const newTable = new HashTable();

      action.payload.forEach((product) => {
        console.log("ADD ITEM",product.name);
        newTable.addItem(product.name);
      });
      console.log("La hastable es: ", newTable);

      return {
        ...state,
        productSearch: newTable,
      };

    default:
      return state;
  }
};

export default reducerProduct;

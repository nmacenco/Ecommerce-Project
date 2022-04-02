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
            // console.log("ADD ITEM",product.name);
            newTable.addItem(product.name);
          });
          console.log("La hastable es: ", newTable);

            return {
                ...state,
                products: action.payload,
                productSearch: newTable,
            };
        case TYPES_PRODUCT.SEARCH_PRODUCTS:

            let selectProducts= state.products.filter(product=>{

                if(product.name.toLowerCase().startsWith(action.payload.toLowerCase())){
                    return product;
                }

            })
            console.log('PRODUCTOS QUE MATCHEAN: ',selectProducts);

            return state;
            

    default: {
      return {
        ...state,
      };
    }
  }
};

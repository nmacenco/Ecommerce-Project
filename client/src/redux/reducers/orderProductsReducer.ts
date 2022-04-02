import { Product, ProductActions, TYPES_PRODUCT } from "../interface";

export interface OrderState {
  orderedProducts: any;
}

const INITIAL_STATE: OrderState = {
  orderedProducts: [],
};

export const reducerOrderProducts = (
  state = INITIAL_STATE,
  action: ProductActions
): OrderState => {
  switch (action.type) {
    case TYPES_PRODUCT.ORDER_PRODUCTS:
      if (action.payload.value === "asc-name") {
        action.payload.products.sort(function(
          a: Product,
          b: Product
        ) {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
      } else if (action.payload.value === "des-name") {
        action.payload.products.sort(function(
          a: Product,
          b: Product
        ) {
          if (a.name < b.name) return 1;
          if (a.name > b.name) return -1;
          return 0;
        });
      } else if (action.payload.value === "asc-price") {
        action.payload.products.sort(function(
          a: Product,
          b: Product
        ) {
          if (a.price > b.price) return 1;
          if (a.price < b.price) return -1;
          return 0;
        });
      } else if (action.payload.value === "des-price") {
        action.payload.products.sort(function(
          a: Product,
          b: Product
        ) {
          if (a.price < b.price) return 1;
          if (a.price > b.price) return -1;
          return 0;
        });
      }
      return {
        ...state,
        orderedProducts: action.payload.products
      };

    default: {
      return { ...state };
    }
  }
};

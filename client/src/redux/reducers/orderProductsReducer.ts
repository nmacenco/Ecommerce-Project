import { Product, ProductActions, TYPES_PRODUCT } from "../interface";

export interface ORDER_STATE {
  orderedProducts: Product[];
}

const INITIAL_STATE: ORDER_STATE = {
  orderedProducts: [],
};

export const reducerOrderProducts = (
  state: ORDER_STATE = INITIAL_STATE,
  action: ProductActions
): ORDER_STATE => {
  switch (action.type) {
    case TYPES_PRODUCT.ORDER_PRODUCTS:
      let order: Product[] = action.payload.products
      if (action.payload.value === "asc-name") {
        order.sort(function (
          a: Product,
          b: Product
        ) {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
      } else if (action.payload.value === "des-name") {
        order.sort(function (
          a: Product,
          b: Product
        ) {
          if (a.name < b.name) return 1;
          if (a.name > b.name) return -1;
          return 0;
        });
      } else if (action.payload.value === "asc-price") {
        order.sort(function (
          a: Product,
          b: Product
        ) {
          if (a.price < b.price) return 1;
          if (a.price > b.price) return -1;
          return 0;
        });
      } else if (action.payload.value === "des-price") {
        order.sort(function (
          a: Product,
          b: Product
        ) {
          if (a.price > b.price) return 1;
          if (a.price < b.price) return -1;
          return 0;
        });
      } else if (action.payload.value === "isActive") {
        order.sort(function (
          a: Product,
          b: Product
        ) {
          if (a.isActive < b.isActive) return 1;
          if (a.isActive > b.isActive) return -1;
          return 0;
        });
      } else if (action.payload.value === "notActive") {
        order.sort(function (
          a: Product,
          b: Product
        ) {
          if (a.isActive > b.isActive) return 1;
          if (a.isActive < b.isActive) return -1;
          return 0
        })
      }
      return {
        ...state,
        orderedProducts: order
      };

    default: {
      return { ...state };
    }
  }
};

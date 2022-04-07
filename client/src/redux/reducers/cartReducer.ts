import { CartActions, Product, TYPES_CART } from "../interface";

export interface CART {
  cart: Product[];
}

const INITIAL_STATE = {
  cart: []
};

export const reducerCart = (
  state: CART = INITIAL_STATE,
  action: CartActions
): CART => {
  switch (action.type) {
    case TYPES_CART.ADD_PRODUCT:
      const newProduct = action.payload;
      const existProduct = state.cart.find(
        (product: Product) => product.id === newProduct.id
      );
      const cartItems = existProduct
        ? //if the product is already in the cart we update it
          state.cart.map((product: Product) =>
            product.id === existProduct.id
              ? //newProduct with the count updated
                newProduct
              : product
          )
        : //if it is null it means it is a new product
          [...state.cart, newProduct];
      return {...state, cart: cartItems};
      //return {...state, cart: {...state.cart, cartItems: [...state.cart.cartItems, cartItems]}}

    default: {
      return {
        ...state,
      };
    }
  }
};

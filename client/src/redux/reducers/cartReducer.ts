import { CartActions, Product, TYPES_CART } from "../interface";

export interface CART {
  cart: Product[];
}

const INITIAL_STATE = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") || "{}")
    : [],
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
      // console.log("PRODUCTO NUEVO: ", newProduct);
      // console.log("PRODUCTO EXISTE?: ", existProduct);

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
      // console.log("ITEMS OF THE CARD: ", cartItems);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      return { ...state, cart: cartItems };

    case TYPES_CART.REMOVE_PRODUCT:
      const cartItemsFiltered = state.cart.filter(
        (product) => product.id !== action.payload.id
      );
      localStorage.setItem("cart", JSON.stringify(cartItemsFiltered));
      return { ...state, cart: cartItemsFiltered };

    default: {
      return {
        ...state,
      };
    }
  }
};

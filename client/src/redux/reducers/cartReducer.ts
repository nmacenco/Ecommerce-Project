import { CartActions, Product, ProductCart, TYPES_CART } from "../interface";

export interface CART {
  cart: ProductCart[];
  ordersHistory: Product[];
}

const INITIAL_STATE = {
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart") || "{}")
    : [],
  ordersHistory: [],
};

export const reducerCart = (
  state: CART = INITIAL_STATE,
  action: CartActions
): CART => {
  switch (action.type) {
    case TYPES_CART.ADD_PRODUCT:
      const newProduct = action.payload;
      const existProduct = state.cart.find(
        (product: ProductCart) => product.productId === newProduct.productId
      );
      // console.log("PRODUCTO NUEVO: ", newProduct);
      // console.log("PRODUCTO EXISTE?: ", existProduct);

      const cartItems = existProduct
        ? //if the product is already in the cart we update it
          state.cart.map((product: ProductCart) =>
            product.productId === existProduct.productId
              ? //newProduct with the count updated
                newProduct
              : product
          )
        : //if it is null it means it is a new product
          [...state.cart, newProduct];
      localStorage.setItem("cart", JSON.stringify(cartItems));
      return { ...state, cart: cartItems };

    case TYPES_CART.REMOVE_PRODUCT:
      const cartItemsFiltered = state.cart.filter(
        (product) => product.productId !== action.payload.productId
      );
      localStorage.setItem("cart", JSON.stringify(cartItemsFiltered));
      return { ...state, cart: cartItemsFiltered };

    case TYPES_CART.CLEAR_CART:
      return { ...state, cart: [] };

    case TYPES_CART.GET_ACTIVEORDER:
      const pendingOrderProducts = action.payload.details
      localStorage.setItem("cart", JSON.stringify(pendingOrderProducts));
      return { ...state, cart: pendingOrderProducts };

    default: {
      return {
        ...state,
      };
    }
  }
};

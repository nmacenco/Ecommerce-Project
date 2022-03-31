

import {Actions, Product, TYPES} from '../interface';


const INITIAL_PRODUCT = {
  id: 0,
  subcategory_id: [],
  name: '',
  brand: '',
  image: '',
  price: 0,
  description: '',
  weight: 0,
  stock: 0
};

export  const productDetailReducer = (state : Product = INITIAL_PRODUCT , action: Actions) : Product => {

    switch (action.type) {
  
      case TYPES.PRODUCT_DETAIL:
          return action.payload
  
      default:
        return state;
    }
  };
import { Actions, Product, TYPES_DETAIL } from '../interface';

const INITIAL_PRODUCT = {
  id: 0,
  name: '',
  image: '',
  price: 0,
  description: '',
  weight: 0,
  stock: 0,
  soldCount : 0 ,
  BrandId : 0 ,
  brand: '',
  SubcategoryId: 0,
  subcategory : '' , 
  CategoryId : 0 , 
  category : 0 , 
};

export const productDetailReducer = (state: Product = INITIAL_PRODUCT, action: Actions): Product => {

  switch (action.type) {

    case TYPES_DETAIL.PRODUCT_DETAIL:
      return action.payload

    case TYPES_DETAIL.DELETE_PRODUCT_DETAIL:
      return action.payload

    default:
      return state;
  }
};

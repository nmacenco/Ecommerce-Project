import {combineReducers} from 'redux';
import {User} from '../interface';
import {Product} from '../interface';
/**
 * 
 * import .... from 'userReducer'
 * import .... from 'productsReducer'
 * 
 */
import {userReducer} from './reducerUser';
import {productDetailReducer} from './reducerProductsDetail';

interface GLOBAL_STATE{
  user:User | null;
  productDetail : Product ;
}

export const rootReducer = combineReducers<GLOBAL_STATE>({
  user:userReducer, 
  productDetail : productDetailReducer
});

export type State=ReturnType<typeof rootReducer>

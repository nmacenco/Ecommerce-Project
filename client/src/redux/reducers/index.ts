import {combineReducers} from 'redux';
import {User} from '../interface';
/**
 * 
 * import .... from 'userReducer'
 * import .... from 'productsReducer'
 * 
 */
import {userReducer} from './reducerUser';

interface GLOBAL_STATE{
    user:User | null;
}

export const rootReducer = combineReducers<GLOBAL_STATE>({
  user:userReducer,
});

export type State=ReturnType<typeof rootReducer>

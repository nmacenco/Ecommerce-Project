/**
 * import .... from 'interface'
 * 
 * 
 */

import { Actions, User, TYPES } from '../interface';

type USER = null | User;

const INITIAL_USER: USER = null;


export const userReducer = (state: USER = INITIAL_USER, action: Actions): USER => {

  switch (action.type) {

    case TYPES.CREATE_USER:
      return action.payload

    default:
      return state;
  }
};
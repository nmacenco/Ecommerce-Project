import { User, UserActions, TYPES_USER } from "../interface";

type USER = null | User;

const INITIAL_USER: USER = null;

export const userReducer = (
  state: USER = INITIAL_USER,
  action: UserActions
): USER => {
  switch (action.type) {
    case TYPES_USER.CREATE_USER:
      return action.payload;

    case TYPES_USER.FIND_USER:
      return action.payload;

    case TYPES_USER.GET_USER:
      return action.payload;

    case TYPES_USER.LOGOUT_USER:
      return action.payload;

    case TYPES_USER.SIGNIN_GOOGLE:
      return action.payload;
    case TYPES_USER.SIGNUP_GOOGLE:
      return action.payload;

    default:
      return state;
  }
};

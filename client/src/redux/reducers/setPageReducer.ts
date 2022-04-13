import { SetPage, TYPES_PAGE } from "../interface";

export type PAGE = number;

const INITIAL_STATE = 1;

const setPageReducer = (state: PAGE = INITIAL_STATE, action: SetPage) => {
  switch (action.type) {
    case TYPES_PAGE.SET_PAGE:
      return action.payload;

    default:
      return state;
  }
};

export default setPageReducer;

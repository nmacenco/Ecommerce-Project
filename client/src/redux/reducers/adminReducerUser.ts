


import { AdminUserActions , TYPES_ADMIN_USER, Users } from "../interface";

export type ADMIN_USERS = {
    users : Users[]
};

const INITIAL_STATE = {
    users : []
};

const adminUsersReducer = (state: ADMIN_USERS = INITIAL_STATE, action: AdminUserActions) : any => {
  switch (action.type) {
    case TYPES_ADMIN_USER.GET_USERS :
      return action.payload;
    default:
      return state;
  }
};

export default adminUsersReducer;
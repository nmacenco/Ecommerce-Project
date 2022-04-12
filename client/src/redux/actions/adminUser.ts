import axios from "axios";
import { Dispatch } from "redux";
import { TYPES_ADMIN_USER } from "../interface";

const URL = "http://localhost:3001/api/admin/users";
const URLRESET = "http://localhost:3001/api/forcedPasswordReset"

export const adminGetUsers = (theToken:any) => {
  try {
    return async (dispatch: Dispatch) => {
      const allUsers = await axios.get(`${URL}`, {
        headers: {
          "auth-token":
            theToken,
        },
      });
      console.log(allUsers.data.users);
      
      return dispatch({
        type: TYPES_ADMIN_USER.GET_USERS,
        payload: allUsers.data.users,
      });
    };
  } catch (error) {
    alert(error);
  }
};
export const adminresetUsers = () => {
  return {
    type: TYPES_ADMIN_USER.RESET_USERS,
    payload: []
  };
};
export const adminEditUser = (id : any  , UserToUpdate : any , theToken : any) => {
  // console.log(UserToUpdate);
  
  try {
    return async (dispatch: Dispatch) => {
       await axios.put(`${URL}/${id}`, UserToUpdate ,  {
        headers: {
          "auth-token":
          theToken,
        },
      });
    };
  } catch (error) {
    alert(error);
  }
};
export const adminForcedPasswordReset = (email : any  , theToken : string) => {
  // console.log(UserToUpdate);
  try {
    // console.log(theToken);
    return async (dispatch: Dispatch) => {
       await axios.post(`${URLRESET}`, email ,  {
         headers: {
           "auth-token":
           theToken,
          },
      });
    };
  } catch (error) {
    console.log(error);
    
    alert(error);
  }
};

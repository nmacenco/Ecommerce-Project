import axios from "axios";
import { Dispatch } from "redux";
import { TYPES_ADMIN_USER, USERSAXIOSDATA } from "../interface";

const URL = "http://localhost:3001/api/admin/users";
const theToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjQ5NDE4NzA5fQ.nAQNbz637DWxPBWzD3k0OssCEkJmk-K5A9MPSrnexoc'
export const adminGetUsers = () => {
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
export const adminEditUser = (id : any  , UserToUpdate : any ) => {
  console.log(UserToUpdate);
  
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

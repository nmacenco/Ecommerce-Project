import axios from "axios";
import { Dispatch } from "redux";
import { TYPES_ADMIN_USER, USERSAXIOSDATA } from "../interface";

const URL = "http://localhost:3001/api/admin/users";

export const adminGetUsers = () => {
  try {
    return async (dispatch: Dispatch) => {
      const allUsers = await axios.get(`${URL}`, {
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjQ5MjkyODczfQ.nPKDcQG-Rfl6zEwNqabYt5Ap2EpBlhZuLvmgHxVzMO8",
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
export const adminEditUser = (id : any  , UserToUpdate : any ) => {
  console.log(UserToUpdate);
  
  try {
    return async (dispatch: Dispatch) => {
       await axios.put(`${URL}/${id}`, UserToUpdate ,  {
        headers: {
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjQ5MjkyODczfQ.nPKDcQG-Rfl6zEwNqabYt5Ap2EpBlhZuLvmgHxVzMO8",
        },
      });
    };
  } catch (error) {
    alert(error);
  }
};

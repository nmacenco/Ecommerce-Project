

import axios from "axios";
import { Dispatch } from "redux";
import {  TYPES_ADMIN_USER, USERSAXIOSDATA } from '../interface';

const URL = "http://localhost:3001/api/admin/users";


export const adminGetUsers = () => {
    try {
        return async (dispatch: Dispatch) => {
          const allUsers = await axios.get<USERSAXIOSDATA>(`${URL}`);
          console.log(allUsers);
          
          return dispatch({
            type: TYPES_ADMIN_USER.GET_USERS,
            payload: allUsers.data.data,
          });
        };
      } catch (error) {
        alert(error);
      }
  };
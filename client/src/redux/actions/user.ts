import axios from "axios";
import { Dispatch } from "redux"
import { TYPES_USER, User } from "../interface";


const URL_USER='';
const USER_STORAGE = "USER_LOGGED";

export const CreateUser=(user:any)=>{

    return async(dispatch:Dispatch)=>{

        try{
            const {data}=await axios.post(URL_USER,user);

            // if(data.error){
            //     throw new Error("Error "+data.error);
            // }

            console.log('despachando el usuario')
            dispatch({
                type:TYPES_USER.CREATE_USER,
                payload:data
            })
            window.localStorage.setItem(USER_STORAGE,data);// Cambiar cuando exista un usuario


        }catch(error){
            console.log('Error en createUSer: ',error);

        }
    }
}

export const GetUSer=(email:string,pass:string)=>{

    return async(dispatch:Dispatch)=>{

        try{
            const {data}=await axios.post(URL_USER,{email,password:pass});

            dispatch({
                type:TYPES_USER.GET_USER,
                payload:data
            })

        }catch(error){
            console.log('Error en Get_User ',error);
        }

    }

}

export const FindUSer=()=>{

    const user= window.localStorage.getItem(USER_STORAGE);
    const userExist= user ? JSON.parse(user) : null;

    return {
        type:TYPES_USER.FIND_USER,
        payload:userExist
    }
}

export const LogoutUser=()=>{

    window.localStorage.removeItem(USER_STORAGE);

    return {
      type: TYPES_USER.LOGOUT_USER,
      payaload: null,
    };
}
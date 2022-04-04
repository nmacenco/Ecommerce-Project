import axios from "axios";
import { Dispatch } from "redux"
import { TYPES_USER, User } from "../interface";


const URL_USER = "http://localhost:3001/api/";
const USER_STORAGE = "USER_LOGGED";

export const CreateUser=(user:any,cb:any)=>{

    return async(dispatch:Dispatch)=>{

        try{
            console.log(URL_USER+'users');
            const {data}=await axios.post(URL_USER+'users',user);

            // if(data.error){
            //     throw new Error("Error "+data.error);
            // }

            console.log('data: ',data);
            if(data.errorMsg){
                alert('ALgo paso!');
            }else{

            }

            dispatch({
                type:TYPES_USER.CREATE_USER,
                payload:data.newUser
            })
            console.log('despachando el usuario');
            cb();

            window.localStorage.setItem(USER_STORAGE,JSON.stringify(data.newUser));// Cambiar cuando exista un usuario


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

    console.log(window.localStorage.getItem(USER_STORAGE));
    window.localStorage.removeItem(USER_STORAGE);

    return {
      type: TYPES_USER.LOGOUT_USER,
      payaload: null,
    };
}
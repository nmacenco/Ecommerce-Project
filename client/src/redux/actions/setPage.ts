
import { TYPES_PAGE } from "../interface"
export function setPage(num:number) {
    return {
        type : TYPES_PAGE.SET_PAGE ,
        payload : num , 
    }
}
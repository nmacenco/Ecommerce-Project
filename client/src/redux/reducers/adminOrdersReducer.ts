import {TYPES_ADMIN, Order , AdminActions} from "../interface";

export interface ORDERS {
    orders: Order[],
}
const INITIAL_STATE = {
    orders : []
} ;


export const ordersAdminReducer = (state: ORDERS = INITIAL_STATE, action: AdminActions): any => {
    switch (action.type) {
        case TYPES_ADMIN.GET_ORDERS :
            return {
                ...state ,
                orders : action.payload }          
        default: {
            return {
                ...state
            }
        }
    }
};
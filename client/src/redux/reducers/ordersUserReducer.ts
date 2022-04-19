import {TYPES_ORDERS_USER, Order , UserOrdersActions, TYPES_CART} from "../interface";

export interface ORDERS_USER {
    userOrders: Order[],
    activeOrder: any,
}

const INITIAL_STATE = {
    userOrders: [],
    activeOrder:{}
} ;


export const ordersUserReducer = (state: ORDERS_USER = INITIAL_STATE, action: UserOrdersActions): any => {
    switch (action.type) {
        case TYPES_ORDERS_USER.GET_ORDERS :
            return  {...state, userOrders:action.payload} ;

        case TYPES_ORDERS_USER.GET_ORDER:
            return {
                ...state , 
                activeOrder : action.payload 
            }
        case TYPES_ORDERS_USER.RESET_ORDER:
            return {
                ...state , 
                activeOrder : action.payload 
            }
        default: {
            return {
                ...state
            }
        }
    }
};
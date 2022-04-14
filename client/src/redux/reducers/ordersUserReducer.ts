import {TYPES_ORDERS_USER, Order , UserOrdersActions} from "../interface";

export interface ORDERS_USER {
    userOrders: Order[],
}

const INITIAL_STATE = {
    userOrders: []
} ;


export const ordersUserReducer = (state: ORDERS_USER = INITIAL_STATE, action: UserOrdersActions): any => {
    switch (action.type) {
        case TYPES_ORDERS_USER.GET_ORDERS :
            return  {...state, userOrders:action.payload}
        default: {
            return {
                ...state
            }
        }
    }
};
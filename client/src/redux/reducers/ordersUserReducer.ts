import {TYPES_ORDERS_USER, Order , UserOrdersActions} from "../interface";

export interface ORDERS_USER {
    userOrders: Order[],
    activeOrder:Order | {},
}

const INITIAL_STATE = {
    userOrders: [],
    activeOrder:{}
} ;


export const ordersUserReducer = (state: ORDERS_USER = INITIAL_STATE, action: UserOrdersActions): any => {
    switch (action.type) {
        case TYPES_ORDERS_USER.GET_ORDERS :
            return  {...state, userOrders:action.payload}

        case TYPES_ORDERS_USER.GET_ACTIVEORDER:
            console.log("activeorder: "+ action.payload.detail)
            return {...state, activeOrder:action.payload}

        default: {
            return {
                ...state
            }
        }
    }
};
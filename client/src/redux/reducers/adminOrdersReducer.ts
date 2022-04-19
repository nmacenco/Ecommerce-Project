import { TYPES_ADMIN, Order, AdminActions } from "../interface";

export interface ORDERS {
    orders: Order[],
}
const INITIAL_STATE = {
    orders: []
};


export const ordersAdminReducer = (state: ORDERS = INITIAL_STATE, action: AdminActions): any => {
    switch (action.type) {
        case TYPES_ADMIN.GET_ORDERS:
            return {
                ...state,
                orders: action.payload
            }
        case TYPES_ADMIN.RESET_ORDERS:
            return {
                ...state,
                orders: action.payload
            }
        case TYPES_ADMIN.O_ORDERS:
            let newOrder: Order[] = []
            let otherOrder: Order[] = []
            newOrder = state.orders.filter((e: Order) => e.status.toLowerCase() === action.payload.toLowerCase())
            otherOrder = state.orders.filter((e: Order) => e.status.toLowerCase() !== action.payload.toLowerCase())

            return {
                ...state,
                orders: newOrder.concat(otherOrder)
            }
        default: {
            return {
                ...state
            }
        }
    }
};
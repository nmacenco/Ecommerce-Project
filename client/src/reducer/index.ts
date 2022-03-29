

import { IState } from "./interfaces";

const initialState: IState = {
    products: [],
    productsCopy: [],
  };

const rootReducer = (state: IState = initialState, action: any): IState => {
    switch(action.type) {

        default:
            return { ...state };
    }

}



export default rootReducer;
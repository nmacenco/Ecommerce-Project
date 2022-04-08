import {TYPES_CATEGORIES, Category, Subcategory , CategoriesActions} from "../interface";

export interface CATEGORIES {
    categories: Category[],
    subcategories: Subcategory[]
}

const INITIAL_STATE = {
    categories: [],
    subcategories: []
}

export const reducerCategories = (state: CATEGORIES = INITIAL_STATE, action: CategoriesActions): CATEGORIES => {
    switch (action.type) {
        case TYPES_CATEGORIES.GET_CATEGORIES :
            return {
                ...state,
                categories: action.payload
            }
        case TYPES_CATEGORIES.GET_SUBCATEGORIES :
            return {
                ...state, 
                subcategories : action.payload
            }
        
        case TYPES_CATEGORIES.RESET_SUBCATEGORIES :
            return {
                ...state, 
                subcategories : action.payload
            }
        
        default: {
            return {
                ...state
            }
        }
    }
};

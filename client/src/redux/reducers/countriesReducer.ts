import { CountriesActions, ICountries, TYPES_COUNTRIES } from "../interface"

export interface COUNTRIES {
    countries: ICountries[]
}

const INITIAL_STATE = {
    countries: []
}

export const countriesReducer = (state: COUNTRIES = INITIAL_STATE, action: CountriesActions): COUNTRIES => {
    switch (action.type) {
        case TYPES_COUNTRIES.GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            }

        default:
            return { ...state }
    }
}
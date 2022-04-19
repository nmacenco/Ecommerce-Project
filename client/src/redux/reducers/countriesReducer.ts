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
            let ordedCountries: ICountries[] = action.payload.sort((
                a: ICountries,
                b: ICountries
            ) => {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0
            })

            return {
                ...state,
                countries: ordedCountries
            }

        default:
            return { ...state }
    }
}
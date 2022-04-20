import axios from "axios";
import { Dispatch } from "redux";
import { TYPES_ADMIN, TYPES_COUNTRIES } from "../interface";

const URL = "/api";

export function getCountries() {
    try {
        return async function (dispatch: Dispatch) {
            const allCategories = await axios.get(URL + "/countries")
            return dispatch({
                type: TYPES_COUNTRIES.GET_COUNTRIES,
                payload: allCategories.data.countries
            })
        }
    } catch (error) {
        console.log(error)
    }
}
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { productNotFound } from "../../redux/actions/products";
import { NotFoundContainer } from "./NotFoundStyles";
export interface NOT_FOUND {
    eliminateFilters: () => void;
}

const NotFound = (props: NOT_FOUND) => {
    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(productNotFound(true))
        setTimeout(function () {
            props.eliminateFilters()
            dispatch(productNotFound(false))
        }, 3000);
    }, [])

    return (
        <NotFoundContainer>
            <h1>No se encontro el Producto</h1>
        </NotFoundContainer>
    )
}


export default NotFound; 
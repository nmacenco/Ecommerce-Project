import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LoadingContainer } from './LoadingStyles';
const Loading = () => {
    const dispatch = useDispatch()
    useEffect(() => {
    }, [])

    return (
        <LoadingContainer>
            <img src="https://sielcomdata.cl/wp-content/uploads/2022/03/loader_2.gif" alt="" />
        </LoadingContainer>
    )
}


export default Loading; 

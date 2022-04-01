import React, { useState } from 'react';
import searchIcon from "../../icons/search-symbol.png";
import { SearchForm } from './SBar';

const Search=():JSX.Element=>{

    const [visible,setVisible] =useState<boolean>(false);


    const SearchRequest=(event:any)=>{

        event.preventDefault();
        console.log('Envio de la busqueda de los productos');

    }

    return (
        <SearchForm className="nav-item d-flex" autoComplete='off' onSubmit={SearchRequest}>
            <div>
                <input
                    className="form-control my-2"
                    type="text"
                    placeholder="Search..."
                    name='search'
                ></input>
            </div>
            <button className="btn btn-secondary my-2" type="submit">
                <img src={searchIcon} />
            </button>
        </SearchForm>
    )
}

export default Search;
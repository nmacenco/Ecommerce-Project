import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import searchIcon from "../../icons/search-symbol.png";
import { State } from '../../redux/reducers';
import { SearchForm } from './SBar';

const Search = (): JSX.Element => {

    const table = useSelector((state: State) => state.products.productSearch);

    const [products, setProducts] = useState<string[]>([]);
    const [value, setValue] = useState<string>('');


    const SearchRequest = (event: any) => {

        event.preventDefault();
        console.log('Envio de la busqueda de los productos');

    }

    const SearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        // console.log(table.autocomplete(event.target.value.trim()));
        if (event.target.value.trim()) {

            setProducts(table.autocomplete(event.target.value.trim()));
        }else{
            setProducts([]);

        }
        setValue(event.target.value)


    }

    const SelectName = (event: any) => {
        event.preventDefault();
        setValue(event.target.innerHTML.trim());
        setProducts([]);
    }
    const closeSelect = () => {
        setProducts([]);
    }
    console.log('TABLA: ',table)

    return (
        <SearchForm className="nav-item d-flex" autoComplete='off' onSubmit={SearchRequest} >
            <div className='desplegable'>
                <input
                    onChange={SearchChange}
                    className="form-control "
                    type="text"
                    placeholder="Search..."
                    name='search'
                    value={value}
                ></input>

            </div>
            <button className="btn btn-secondary my-2" type="submit">
                <img src={searchIcon} />
            </button>
                <article onBlur={closeSelect}>
                    {
                        products.map((product, i) => {
                            return (
                                <span key={i} onClick={SelectName}>{product.slice(0,30)}</span>
                            )
                        })
                    }
                </article>
        </SearchForm>
    )
}

export default Search;
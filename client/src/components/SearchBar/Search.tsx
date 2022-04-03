import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import searchIcon from "../../icons/search-symbol.png";
import { selectProducts } from '../../redux/actions/products';
import { State } from '../../redux/reducers';
import { SearchForm } from './SBar';

const Search = (): JSX.Element => {

    const dispatch=useDispatch();
    const table = useSelector((state: State) => state.products.productSearch);

    const [products, setProducts] = useState<string[]>([]);
    const [value, setValue] = useState<string>('');
    const [realValue,setRealValue]=useState<string>('');


    const SearchRequest = (event: any) => {

        event.preventDefault();
        console.log('Envio de la busqueda de los productos');
        console.log('valor del input:  ',realValue);
        setProducts([]);
        dispatch(selectProducts(realValue));
    }

    const SearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        // console.log(table.autocomplete(event.target.value.trim()));
        if (event.target.value.trim()) {

            setProducts(table.autocomplete(event.target.value.trim()));
            setRealValue(event.target.value);
        }else{
            setProducts([]);

        }
        setValue(event.target.value)


    }

    const SelectName = (event: any) => {
        event.preventDefault();
        setValue(event.target.innerHTML.trim());
        setRealValue(event.target.id);
        setProducts([]);
    }
    const closeSelect = () => {
        setProducts([]);
    }
    // console.log('TABLA: ',table);

    return (
        <SearchForm className="d-flex me-lg-4" autoComplete='off' onSubmit={SearchRequest} >
            <div className='desplegable'>
                <input
                    onChange={SearchChange}
                    className="form-control "
                    type="text"
                    placeholder="Search..."
                    name='search'
                    value={value}
                />

            </div>
            <button className="btn btn-secondary my-2" type="submit">
                <img src={searchIcon} />
            </button>
                <article onBlur={closeSelect}>
                    {
                        products.map((product, i) => {
                            return (
                                <span key={i} id={product} onClick={SelectName}>{product.slice(0,30)}</span>
                            )
                        })
                    }
                </article>
        </SearchForm>
    )
}

export default Search;
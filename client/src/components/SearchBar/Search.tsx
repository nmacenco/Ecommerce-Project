import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import searchIcon from "../../icons/search-symbol.png";
import { selectProducts } from "../../redux/actions/products";
import { State } from "../../redux/reducers";
import { SearchForm } from "./SBar";

const Search = (): JSX.Element => {
  const dispatch = useDispatch();
  const table = useSelector((state: State) => state.products.productSearch);
  const artefacts = useSelector((state: State) => state.products.products);

  const [products, setProducts] = useState<string[]>([]);
  const [value, setValue] = useState<string>("");
  const [realValue, setRealValue] = useState<string>("");

  const SearchRequest = (event: any) => {
    event.preventDefault();
    // console.log('valor del input:  ',realValue);
    setProducts([]);
    // let selectArtefacts=[];
    let selectArtefacts = artefacts.filter((product) => {
      // if(product.name.toLowerCase().startsWith(realValue.toLowerCase())){
      //     return product;
      // }
      if (product.name.toLowerCase().includes(realValue.toLowerCase())) {
        return product;
      }
    });

    dispatch(selectProducts(selectArtefacts));
    setValue("");
    
  };

  const SearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    // console.log(table.autocomplete(event.target.value.trim()));
    if (event.target.value.trim()) {
      setProducts(table.autocomplete(event.target.value.trim()));
      setRealValue(event.target.value);
    } else {
      setProducts([]);
    }
    setValue(event.target.value);
  };

  return (
    <SearchForm
      className="d-flex me-lg-4"
      autoComplete="off"
      onSubmit={SearchRequest}
    >
      {/* {console.log('Search renderizado!')} */}
      <div className="desplegable">
        <input
          onChange={SearchChange}
          className="form-control "
          type="text"
          placeholder="Search..."
          name="search"
          value={value}
          list="products"
        />
      </div>
      <button className="btn btn-secondary my-2" type="submit">
        <img src={searchIcon} />
      </button>
      <datalist id="products">
        {products.map((product, i) => {
          return <option key={i} id={product} value={product} />;
        })}
      </datalist>
    </SearchForm>
  );
};

export default Search;

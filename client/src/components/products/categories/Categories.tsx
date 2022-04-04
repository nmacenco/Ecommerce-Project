import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoriesContainer , Select } from "./CategoriesStyles";
import { State } from "../../../redux/reducers/index";
import {
  getCategories,
  getSubcategories,
} from "../../../redux/actions/categories";
import {filterProducts} from '../../../redux/actions/filterByCategory'
import { Product } from "../../../redux/interface";
import { ORDER } from "../cards/Cards";
const Categories = ({ page, orders }: ORDER): JSX.Element => {
  const dispatch = useDispatch();
  const categories = useSelector((state: State) => state.categories);
  const allProducts = useSelector(
    (state: State) => state.products.copyProducts
  );
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubcategories());
  }, []);

  function handleFilter(
    e: React.ChangeEvent<HTMLSelectElement>,
    allProducts: Product[]
  ) : void {
    dispatch(filterProducts(e.target.value, allProducts));
    e.target.value = e.target[0].innerHTML
    page(1)
  }

  return (
    <CategoriesContainer className="accordion mx-3 mt-3" id="accordionMain">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingOne">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOne"
            aria-expanded="false"
            aria-controls="collapseOne"
          >
            Categories
          </button>
        </h2>
        <div
          id="collapseOne"
          className="accordion-collapse collapse"
          aria-labelledby="headingOne"
          data-bs-parent="#accordionMain"
        >
          <div className="accordion-body">
            {categories.categories.length > 0 &&
              categories.categories.map((categorie, i) => {
                return (
                    <Select key={i}
                      onChange={(e) => handleFilter(e,allProducts)}
                      className="accordion-header"
                      defaultValue={`${categorie.name}`}
                    >
                      <option disabled hidden>
                        {`${categorie.name}`}
                      </option>
                      {categories.subcategories.length > 0 &&
                        categories.subcategories.map((subcategory, i) => {
                          if (categorie.id === subcategory.CategoryId) {
                            return (
                              <option key={i}
                              // className="accordion-header"
                              className="accordion-body"
                               value={`${subcategory.name}`}>
                                {subcategory.name}
                              </option>
                            );
                          }
                        })}
                    </Select>
                );
              })}
          </div>

           {/* <div className="accordion-body">
            {categories.categories.length > 0 &&
              categories.categories.map((e ) => {
                return (
                  <div key={e.id}>
                    <h2 className="accordion-header" id={e.name + "label"}>
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={"#" + e.name}
                        aria-expanded="false"
                        aria-controls={e.name}
                      >
                        {e.name}
                      </button>
                    </h2>
                    <div
                      id={e.name}
                      className="accordion-collapse collapse"
                      aria-labelledby={e.name + "label"}
                      data-bs-parent="#categories"
                    >
                      <div className="accordion-body">
                        {categories.subcategories.length > 0 &&
                          categories.subcategories.map((subcategory, i) => {
                            if (e.id === subcategory.CategoryId) {
                              return <p key={i} onClick={() => handleFilter( e ,allProducts)}>{subcategory.name}</p>;
                            } 
                          })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>  */}
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingTwo">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTwo"
            aria-expanded="false"
            aria-controls="collapseTwo"
          >
            Price
          </button>
        </h2>
        <div
          id="collapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="headingTwo"
          data-bs-parent="#accordionMain"
        >
          <div className="accordion-body"></div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingThree">
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseThree"
            aria-expanded="false"
            aria-controls="collapseThree"
          >
            Brands
          </button>
        </h2>
        <div
          id="collapseThree"
          className="accordion-collapse collapse"
          aria-labelledby="headingThree"
          data-bs-parent="#accordionMain"
        >
          <div className="accordion-body"></div>
        </div>
      </div>
    </CategoriesContainer>
  );
};

export default Categories;

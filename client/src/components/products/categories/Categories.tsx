import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoriesContainer, Select } from "./CategoriesStyles";
import { State } from "../../../redux/reducers/index";
import {getCategories,getSubcategories} from "../../../redux/actions/categories";
import { filterProducts } from "../../../redux/actions/filterByCategory";
import { Product } from "../../../redux/interface";
import { ORDER } from "../cards/Cards";
import { productNotFound } from "../../../redux/actions/products";
import { getBrands } from "../../../redux/actions/brands";
import { filterByBrand } from "../../../redux/actions/filterByBrand";

const Categories = ({ page, orders }: ORDER): JSX.Element => {
  const dispatch = useDispatch();
  const categories = useSelector((state: State) => state.categories);
  const allProducts = useSelector((state: State) => state.products.copyProducts);
  const brands = useSelector((state: State) => state.brands.brands);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubcategories());
    dispatch(getBrands());
  }, []);

  function handleFilter(e: any, allProducts: Product[]): void {
    dispatch(productNotFound(false))
    dispatch(filterProducts(e.target.value, allProducts));
    orders(e.target.value)
    page(1);
  }
  function handlerFIlterByBrand(e: any): void {
    dispatch(productNotFound(false))
    dispatch(filterByBrand(e.target.innerHTML));
    orders(e.target.value)
    page(1);
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
            {categories.categories.map((category, i) => {
              return (
                <div key={i}>
                  <h2
                    className="accordion-header"
                    id={category.name.replace(/ /g, "") + "label"}
                  >
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={"#" + category.name.replace(/ /g, "")}
                      aria-expanded="false"
                      aria-controls={category.name.replace(/ /g, "")}
                    >
                      {category.name}
                    </button>
                  </h2>
                  <div
                    id={category.name.replace(/ /g, "")}
                    className="accordion-collapse collapse"
                    aria-labelledby={category.id + "label"}
                    data-bs-parent="#categories"
                  >
                    <div className="accordion-body btn-group-vertical">
                      {categories.subcategories.map((subcategory, i) => {
                        if (category.id === subcategory.CategoryId) {
                          return (
                            <button
                              className="btn p-1 text-start"
                              key={i}
                              value={subcategory.name}
                              onClick={(e) => handleFilter(e, allProducts)}
                            >
                              {subcategory.name}
                            </button>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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

          <div className="accordion-body">
            {brands.map((brand, i) => {
              return (
                <div  key={i}>
                  <h2
                    className="accordion-header"
                    id={brand.name.replace(/ /g, "") + "label"}
                  >
                    <button
                      type="button"
                      data-bs-target={"#" + brand.name.replace(/ /g, "")}
                      aria-expanded="false"
                      className="btn p-1 text-start"
                      key={i}
                      aria-controls={brand.name.replace(/ /g, "")}
                      onClick={(e) => handlerFIlterByBrand(e)}
                    >
                      {brand.name}
                    </button>
                  </h2>
                  <div
                    id={brand.name.replace(/ /g, "")}
                    className="accordion-collapse collapse"
                    aria-labelledby={brand.id + "label"}
                    data-bs-parent="#categories"
                  >

                  </div>
                </div>
              );
            })}
          </div>
      </div>
      </div>
    </CategoriesContainer>
  );
};

export default Categories;

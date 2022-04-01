import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CategoriesContainer } from "./CategoriesStyles";
import { State } from "../../../redux/reducers/index";
import {
  getCategories,
  getSubcategories,
} from "../../../redux/actions/categories";
const Categories = (): JSX.Element => {
  const dispatch = useDispatch();
  const categories = useSelector((state: State) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubcategories());
  }, []);

  const data = [
    {
      name: "perifericos",
      subCategories: ["Mouse", "Teclados", "Auriculares"],
    },
    {
      name: "memorias",
      subCategories: ["RAM", "ROM", "SSD"],
    },
    {
      name: "consolas",
      subCategories: ["Playstation", "Xbox", "WII"],
    },
  ];
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
            {/* {data.map((e, i) => {
              return (
                <div key={i}>
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
                    <div className="accordion-body"

                    >
                      {e.subCategories.map((subcategory, i) => {
                        return <p key={i} onClick={() => console.log(subcategory)}>{subcategory}</p>;
                      })}
                    </div>
                  </div>
                </div>
              );
            })} */}
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
                              return <p key={i} onClick={() => console.log(subcategory.name)}>{subcategory.name}</p>;
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
          <div className="accordion-body"></div>
        </div>
      </div>
    </CategoriesContainer>
  );
};

export default Categories;

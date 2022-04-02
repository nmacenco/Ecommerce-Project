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
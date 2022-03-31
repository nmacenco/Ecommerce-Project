import React from "react";
import Cards from "./cards/Cards";
import Categories from "./categories/Categories";

const Products = () => {
  return (
    <div className="d-flex">
      <Categories />
      <Cards />
    </div>
  );
};

export default Products;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, orderProducts } from "../../../../redux/actions/products";
import { State } from "../../../../redux/reducers";
import { Select } from "./FilterStyles";

const Filter = (): JSX.Element => {
  const [order, setOrder] = useState<string>("");
  const dispatch = useDispatch();
  const allProducts = useSelector((state: State) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  function handleSort(
    e: React.ChangeEvent<HTMLSelectElement>,
    //es un objeto
    allProducts: any
  ): void {
    e.preventDefault();
    console.log(allProducts);
    dispatch(orderProducts(e.target.value, allProducts.orderedProducts));
    // setCurrentPage(1);
    setOrder(`${e.target.value} order`);
  }

  return (
    <div className="card mt-3">
      <div className=" d-flex">
        <Select
          className="form-select"
          onChange={(e) => handleSort(e, allProducts)}
        >
          <option>Order by</option>
          <option value="asc-price">Higher price</option>
          <option value="des-price">Lower price</option>
          <div className="dropdown-divider"></div>
          <option value="asc-name">A - Z</option>
          <option value="des-name">Z - A</option>
        </Select>
        <p className="ms-auto m-3">100 products</p>
      </div>
    </div>
  );
};

export default Filter;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, orderProducts, productNotFound } from "../../../../redux/actions/products";
import { Product } from "../../../../redux/interface";
import { State } from "../../../../redux/reducers";
import { ORDER } from "../Cards";
import { Select } from "./FilterStyles";

const Filter = ({ page, orders }: ORDER): JSX.Element => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state: State) => state.products.products);
  const filteredProducts = useSelector((state: State) => state.filteredProducts.filteredProducts);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  function handleSort(e: React.ChangeEvent<HTMLSelectElement>, allProducts: Product[]): void {
    e.preventDefault();
    // dispatch(productNotFound(false))
    page(1)
    orders(`${e.target.value} order`);
    filteredProducts.length > 0 ?
      dispatch(orderProducts(e.target.value, filteredProducts)) :
      dispatch(orderProducts(e.target.value, filteredProducts));
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
        <p className="ms-auto m-3">{!filteredProducts.length ? "0" : filteredProducts.length} products</p>
      </div>
    </div>
  );
};

export default Filter;

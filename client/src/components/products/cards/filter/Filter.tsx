import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router";
import { getProducts, orderProducts, productNotFound } from "../../../../redux/actions/products";
import { Product } from "../../../../redux/interface";
import { State } from "../../../../redux/reducers";
import { ORDER } from "../Cards";
import { Select } from "./FilterStyles";

const Filter = ({ page, orders }: ORDER): JSX.Element => {
  const dispatch = useDispatch();
  const location = useLocation()
  const user = useSelector((state: State) => state.user);
  const filteredProducts = useSelector((state: State) => state.filteredProducts.filteredProducts);
  let counter: any[] = []
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  function handleSort(e: React.ChangeEvent<HTMLSelectElement>): void {
    e.preventDefault();
    // dispatch(productNotFound(false))
    dispatch(orderProducts(e.target.value, filteredProducts))
    page(1)
    orders(`${e.target.value} order`);

  }

  console.log(location)
  return (
    <div className="card mt-3">
      <div className=" d-flex">
        <Select
          className="form-select"
          onChange={(e) => handleSort(e)}
        >
          <option>Order by</option>
          <option value="asc-price">Higher price</option>
          <option value="des-price">Lower price</option>
          <div className="dropdown-divider"></div>
          <option value="asc-name">A - Z</option>
          <option value="des-name">Z - A</option>
        </Select>
        {
          location.pathname === "/productsAdminMode" ?
            <Select
              className="form-select"
              onChange={(e) => handleSort(e)}
            >
              <option>Active or Not</option>
              <option value="isActive">Active</option>
              <option value="notActive">Not active</option>
            </Select>
            : ""
        }

        <p className="ms-auto m-3">{!filteredProducts.length ? '' : filteredProducts.map(product => {
          if (product.isActive) { counter.push(product.id) }
        })} {counter.length}  products </p>
      </div>
    </div>
  );
};

export default Filter;

import React, { useEffect, useState } from "react";
import Card from "./card/Card";
import Filter from "./filter/Filter";
import { CardsContainer } from "./CardsStyles";
import Pagination from "./pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../redux/reducers/index";
import { orderProducts } from "../../../redux/actions/products";
import { Product } from "../../../redux/interface";
import Loading from '../../loading/Loading'
export interface IData {
  length: number;
  page: (numberOfPage: number) => void;
}

export interface ORDER {
  page: (numberOfPage: number) => void;
  orders: (typeorder: string) => void;
}

const Cards = (): JSX.Element => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [order, setOrder] = useState<string>("")
  const productsList = useSelector((state: State) => state.products.products);
  const filteredProductList = useSelector((state: State) => state.filteredProducts.filteredProducts);
  const page = (numberOfPage: number): void => {
    setCurrentPage(numberOfPage);
  };
  const orders = (typeorder: string): void => {
    setOrder(typeorder)
    console.log(typeorder)
  }
  const finalProduct = currentPage * 32;
  const firstProduct = finalProduct - 32;
  // const newProductsList = productsList.slice(firstProduct, finalProduct);
  let newProductsList : Product[] = [] ;
  filteredProductList.length > 0 
    ?
      newProductsList = filteredProductList.slice(firstProduct, finalProduct) 
    :
      newProductsList = productsList.slice(firstProduct, finalProduct);
      console.log(newProductsList)
  return (
    <CardsContainer className="w-100">
      <Filter page={page} orders={orders} />

      {/* {(newProductsList.length !== 0) ? <><div className="mx-auto mt-3 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
        {newProductsList.map((e: Product) => {
          return (
            <div className="col" key={e.id}>
              <Card name={e.name} image={e.image} price={e.price} id={e.id} />
            </div>
          );
        })}
      </div>

        <Pagination length={productsList.length} page={page} /> </> : <h2>LOADING</h2>
      } */}
      {
      (filteredProductList.length !== 0) ? 
        <>
          <div className="mx-auto mt-3 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
            {filteredProductList.map((e: Product) => {
              return (
                <div className="col" key={e.id}>
                  <Card name={e.name} image={e.image} price={e.price} id={e.id} />
                </div>
              );
            })}
          </div>

          <Pagination length={filteredProductList.length} page={page} /> 
        </> 
      :
      (newProductsList.length !== 0) ? 
        <>
          <div className="mx-auto mt-3 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
            {newProductsList.map((e: Product) => {
              return (
                <div className="col" key={e.id}>
                  <Card name={e.name} image={e.image} price={e.price} id={e.id} />
                </div>
              );
            })}
          </div>

          <Pagination length={productsList.length} page={page} /> 
        </> 
        : <Loading></Loading>
      }

    </CardsContainer>
  );
};
export default Cards;

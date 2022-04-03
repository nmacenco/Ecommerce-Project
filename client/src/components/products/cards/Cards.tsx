import React, { useEffect, useState } from "react";
import Card from "./card/Card";
import Filter from "./filter/Filter";
import { CardsContainer, ReactPaginateContainer } from "./CardsStyles";
// import Pagination from "./pagination/Pagination";

import ReactPaginate from "react-paginate";

import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../redux/reducers/index";
import { getProducts } from "../../../redux/actions/products";
import { Product } from "../../../redux/interface";
import Loading from "../../loading/Loading";
import Categories from "../categories/Categories";
import { ProductsContainer } from "../ProductsStyles";
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

  useEffect(() => {
    if (!productsList.length) {
      dispatch(getProducts());
    }
  }, [dispatch]);
  const [order, setOrder] = useState<string>("");
  const productsList = useSelector((state: State) => state.products.products);
  const filteredProductList = useSelector(
    (state: State) => state.filteredProducts.filteredProducts
  );

  const page = (numberOfPage: number): void => {
    setCurrentPage(numberOfPage);
  };
  const orders = (typeorder: string): void => {
    setOrder(typeorder);
    console.log(typeorder);
  };

  const finalProduct = currentPage * 32;
  const firstProduct = finalProduct - 32;
  let newProductsList: Product[] = [];
  filteredProductList.length > 0
    ? (newProductsList = filteredProductList.slice(firstProduct, finalProduct))
    : (newProductsList = productsList.slice(firstProduct, finalProduct));

  /// implementing react paginate

  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected + 1);
  };

  return (
    <ProductsContainer className="row row-cols-lg-2 row-cols-md-1 mx-auto">
      <div className="col-xl-2 col-lg-3 col-sm-12">
        <Categories page={page} orders={orders} />
      </div>
      <div className="col-lg-9 col-md-12">
        <CardsContainer className="w-100 ">
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
          {filteredProductList.length !== 0 ? (
            <>
              <div className="mx-auto mt-3 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
                {newProductsList.map((e: Product) => {
                  return (
                    <div className="col" key={e.id}>
                      <Card
                        name={e.name}
                        image={e.image}
                        price={e.price}
                        id={e.id}
                      />
                    </div>
                  );
                })}
              </div>
              <ReactPaginateContainer>
                <ReactPaginate
                  pageCount={filteredProductList.length / 32}
                  nextLabel={">"}
                  previousLabel={"<"}
                  marginPagesDisplayed={2}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination justify-content-center"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}
                  activeClassName={"active"}
                ></ReactPaginate>
              </ReactPaginateContainer>
            </>
          ) : newProductsList.length !== 0 ? (
            <>
              <div className="mx-auto mt-3 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4">
                {newProductsList.map((e: Product) => {
                  return (
                    <div className="col" key={e.id}>
                      <Card
                        name={e.name}
                        image={e.image}
                        price={e.price}
                        id={e.id}
                      />
                    </div>
                  );
                })}
              </div>
              <ReactPaginateContainer>
                <ReactPaginate
                  pageCount={productsList.length / 32}
                  nextLabel={">"}
                  previousLabel={"<"}
                  marginPagesDisplayed={2}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination justify-content-center"}
                  pageClassName={"page-item"}
                  pageLinkClassName={"page-link"}
                  previousClassName={"page-item"}
                  previousLinkClassName={"page-link"}
                  nextClassName={"page-item"}
                  nextLinkClassName={"page-link"}
                  breakClassName={"page-item"}
                  breakLinkClassName={"page-link"}
                  activeClassName={"active"}
                ></ReactPaginate>
              </ReactPaginateContainer>
            </>
          ) : (
            <Loading></Loading>
          )}
        </CardsContainer>
      </div>
    </ProductsContainer>
  );
};
export default Cards;

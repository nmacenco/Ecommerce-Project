import React, { useEffect, useState } from "react";
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
import AdminModeCard from "./card/AdminModeCard";
import NotFound from "../../notFound/NotFound";
import Pagination from "./pagination/Pagination";
import { chargeFilter, filterProducts, removeFilter } from "../../../redux/actions/filterByCategory";
import { filterByBrand } from "../../../redux/actions/filterByBrand";
export interface IData {
  length: number;
  page: (numberOfPage: number) => void;
}

export interface ORDER {
  page: (numberOfPage: number) => void;
  orders: (typeorder: string) => void;
  AdmOrders: (typeorder: string) => void;
}

export interface FILTER_BOX {
  subcategory: string,
  brand: string
}

const AdminModeCards = (): JSX.Element => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterBox, setFilterBox] = useState<FILTER_BOX>({
    subcategory: "",
    brand: ""
  })
  const [order, setOrder] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false)
  const [Admorders, setAdmOrders] = useState<string>("");
  const productsList = useSelector((state: State) => state.products.products);
  const copyProductsList = useSelector((state: State) => state.products.copyProducts)
  const allSubcategories = useSelector((state: State) => state.categories.subcategories);
  const notFound = useSelector((state: State) => state.products.not_found);
  const filteredProductList = useSelector((state: State) => state.filteredProducts.filteredProducts);

  const page = (numberOfPage: number): void => {
    setCurrentPage(numberOfPage);
  };
  const orders = (typeorder: string): void => {
    if (typeorder !== 'asc-price order' && typeorder !== 'des-price order' && typeorder !== 'des-name order' && typeorder !== 'asc-name order' && typeorder !== 'Order by order') {
      let existCat = allSubcategories.filter((e: any) => e.name === typeorder)
      if (existCat.length === 1) {
        setFilterBox({ ...filterBox, subcategory: typeorder })
        dispatch(chargeFilter(copyProductsList))
        if (filterBox.brand.length !== 0) {
          console.log('Hay brand')
          dispatch(filterByBrand(filterBox.brand))
        }
        dispatch(filterProducts(typeorder))
      }
      else {
        setFilterBox({ ...filterBox, brand: typeorder })
        dispatch(chargeFilter(copyProductsList))
        if (filterBox.subcategory.length !== 0) {
          console.log('Hay subcategory')
          dispatch(filterProducts(filterBox.subcategory))
        }
        dispatch(filterByBrand(typeorder))
      }
    }
    setOrder(typeorder);
  };

  const AdmOrders = (typeorder: string): void => {
    setAdmOrders(typeorder);
  };
  useEffect(() => {
    // if (!productsList.length) {
    dispatch(getProducts());
    // }
  }, [Admorders]);

  const finalProduct = currentPage * 32;
  const firstProduct = finalProduct - 32;
  let newProductsList: Product[] = [];
  // newProductsList = productsList.slice(firstProduct, finalProduct);
  // let newProductsList: Product[] = [];
  filteredProductList.length > 0
    ? (newProductsList = filteredProductList.slice(firstProduct, finalProduct))
    : (newProductsList = productsList.slice(firstProduct, finalProduct));

  const handlePageClick = (data: any) => {
    setCurrentPage(data.selected + 1);
  };
  const LoadCharge = (bool: boolean): void => {
    setLoad(bool)
  }

  useEffect(() => {
    setTimeout(() => {
      LoadCharge(true)
    }, 500)
  }, [setLoad])

  const resetFilter = (e: any): void => {
    e.preventDefault()
    if (filterBox.subcategory.length === 0 || filterBox.brand.length === 0) {
      dispatch(chargeFilter(copyProductsList))
    } else if (filterBox.subcategory === e.target.value) dispatch(removeFilter(filterBox.brand))
    else dispatch(removeFilter(filterBox.subcategory))
    let existCat = allSubcategories.filter((s: any) => s.name === e.target.value)
    if (existCat.length === 0) setFilterBox({ ...filterBox, brand: "" })
    else setFilterBox({ ...filterBox, subcategory: "" })
  }

  const eliminateFilters = (): void => {
    setFilterBox({
      ...filterBox,
      subcategory: "",
      brand: ""
    })
  }
  return (
    <ProductsContainer className="row row-cols-lg-2 row-cols-md-1 mx-auto">
      <div className="col-xl-2 col-lg-3 col-sm-12">
        <Categories page={page} orders={orders} />
      </div>
      <div className="col-lg-9 col-md-12">
        <CardsContainer className="w-100 ">
          <Filter page={page} orders={orders} />

          {load === false ? (
            <Loading></Loading>
          ) : filteredProductList.length > 0 ? (
            <>
              {filterBox.subcategory.length !== 0 ? <span><button value={filterBox.subcategory} onClick={(e) => resetFilter(e)} className="btn btn-primary mt-2 mr-2">{filterBox.subcategory}</button></span> : ""}
              {filterBox.brand.length !== 0 ? <span><button value={filterBox.brand} onClick={(e) => resetFilter(e)} className="btn btn-primary mt-2 mr-2">{filterBox.brand}</button></span> : ""}
              <div className="" >
                <table className="table table-hover ">
                  <thead>
                    <tr>
                      <th scope="col">Image</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Delete</th>
                      <th scope="col">Edit </th>
                    </tr>
                  </thead>
                  {newProductsList.map((e: Product) => {
                    return (
                      <AdminModeCard
                        name={e.name}
                        image={e.image}
                        price={e.price}
                        key={e.id}
                        id={e.id}
                        AdmOrders={AdmOrders}
                        page={page}
                      />
                    );
                  })}
                </table>
                );
              </div>
              <ReactPaginateContainer>
                <Pagination
                  productList={filteredProductList.length}
                  handlePageClick={handlePageClick}
                ></Pagination>
                {/* <ReactPaginate
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
                ></ReactPaginate> */}
              </ReactPaginateContainer>
            </>
          ) : (
            <NotFound eliminateFilters={eliminateFilters}></NotFound>
          )}

          {/* {filteredProductList.length !== 0 ? (
            <>
              <div className="">
                <table className="table table-hover ">
                  <thead>
                    <tr>
                      <th scope="col">Image</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Delete</th>
                      <th scope="col">Edit </th>
                    </tr>
                  </thead>
                  {newProductsList.map((e: Product) => {
                    return (
                      <AdminModeCard
                        name={e.name}
                        image={e.image}
                        price={e.price}
                        id={e.id}
                        AdmOrders={AdmOrders}
                        page={page}
                      />
                    );
                  })}
                </table>
                );
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
              <div className="">
                <table className="table table-hover ">
                  <thead>
                    <tr>
                      <th scope="col">Image</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Delete</th>
                      <th scope="col">Edit </th>
                    </tr>
                  </thead>
                  {newProductsList.map((e: Product) => {
                    return (
                      <AdminModeCard
                        name={e.name}
                        image={e.image}
                        price={e.price}
                        id={e.id}
                        AdmOrders={AdmOrders}
                        page={page}
                      />
                    );
                  })}
                </table>
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
          )} */}
        </CardsContainer>
      </div>
    </ProductsContainer>
  );
};
export default AdminModeCards;

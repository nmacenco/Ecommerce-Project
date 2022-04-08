import React, { useEffect, useState } from "react";
import Card from "./card/Card";
import Filter from "./filter/Filter";
import { CardsContainer, ReactPaginateContainer } from "./CardsStyles";
import Pagination from "./pagination/Pagination";

import ReactPaginate from "react-paginate";

import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../redux/reducers/index";
import { Data_Paginate, FILTER_BOX, Product, Subcategory } from "../../../redux/interface";
import Loading from "../../loading/Loading";
import Categories from "../categories/Categories";
import { ProductsContainer } from "../ProductsStyles";
import NotFound from "../../notFound/NotFound";
import { chargeFilter, filterByBrand, filterProducts, removeFilter } from "../../../redux/actions/filterByCategory";
import { execPath } from "process";

export interface ORDER {
  page: (numberOfPage: number) => void;
  orders: (typeorder: string) => void;
}

const Cards = (): JSX.Element => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [load, setLoad] = useState<boolean>(false)
  const [order, setOrder] = useState<string>("");
  const [filterBox, setFilterBox] = useState<FILTER_BOX>({
    subcategory: "",
    brand: ""
  })
  const productsList = useSelector((state: State) => state.products.products);
  const copyProductsList = useSelector((state: State) => state.products.copyProducts)
  const filteredProductList = useSelector((state: State) => state.filteredProducts.filteredProducts);
  const allSubcategories = useSelector((state: State) => state.categories.subcategories);

  const page = (numberOfPage: number): void => {
    setCurrentPage(numberOfPage);
  };
  const orders = (typeorder: string): void => {
    if (typeorder !== 'asc-price order' && typeorder !== 'des-price order' && typeorder !== 'des-name order' && typeorder !== 'asc-name order' && typeorder !== 'Order by order') {
      let existCat = allSubcategories.filter((e: Subcategory) => e.name === typeorder)
      if (existCat.length === 1) {
        setFilterBox({ ...filterBox, subcategory: typeorder })
        dispatch(chargeFilter(copyProductsList))
        if (filterBox.brand.length !== 0) {
          dispatch(filterByBrand(filterBox.brand))
        }
        dispatch(filterProducts(typeorder))
      }
      else {
        setFilterBox({ ...filterBox, brand: typeorder })
        dispatch(chargeFilter(copyProductsList))
        if (filterBox.subcategory.length !== 0) {
          dispatch(filterProducts(filterBox.subcategory))
        }
        dispatch(filterByBrand(typeorder))
      }
    }
    setOrder(typeorder);
  };

  const LoadCharge = (bool: boolean): void => {
    setLoad(bool)
  }

  useEffect(() => {
    dispatch(chargeFilter(copyProductsList))
  }, [filteredProductList.length > copyProductsList.length])

  useEffect(() => {
    setTimeout(() => {
      LoadCharge(true)
    }, 500)
  }, [setLoad])

  const finalProduct = currentPage * 32;
  const firstProduct = finalProduct - 32;
  let newProductsList: Product[] = [];
  filteredProductList.length > 0
    ? (newProductsList = filteredProductList.slice(firstProduct, finalProduct))
    : (newProductsList = productsList.slice(firstProduct, finalProduct))

  // implementing react paginate

  const handlePageClick = (data: Data_Paginate): void => {
    setCurrentPage(data.selected + 1);
  };

  const resetFilter = (e: string): void => {
    if (filterBox.subcategory.length === 0 || filterBox.brand.length === 0) {
      dispatch(chargeFilter(copyProductsList))
    } else if (filterBox.subcategory === e) dispatch(removeFilter(filterBox.brand))
    else dispatch(removeFilter(filterBox.subcategory))
    let existCat = allSubcategories.filter((s: any) => s.name === e)
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
    <ProductsContainer className="row row-cols-xl-2 row-cols-md-1 mx-auto">
      <div className="col-xl-3 col-sm-12">
        <Categories page={page} orders={orders} />
      </div>
      <div className="col-xl-9 col-md-12">
        <CardsContainer className="w-100 ">
          <Filter page={page} orders={orders} />

          {
            load === false ?
              <Loading></Loading>
              :
              filteredProductList.length > 0 ?
                <>
                  {filterBox.subcategory.length !== 0 ? <span><button onClick={() => resetFilter(filterBox.subcategory)} className="btn btn-primary mt-2 mr-2">{filterBox.subcategory}</button></span> : ""}
                  {filterBox.brand.length !== 0 ? <span><button onClick={() => resetFilter(filterBox.brand)} className="btn btn-primary mt-2 mr-2">{filterBox.brand}</button></span> : ""}
                  <div className="mt-3 row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xxl-4 g-4 d-flex justify-content-center">
                    {newProductsList.map((e: Product) => {
                      return (
                        <div className="col" key={e.id}>
                          <Card
                            product={e}
                            stock={e.stock}
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
                    <Pagination
                      productList={filteredProductList.length}
                      handlePageClick={handlePageClick}
                    ></Pagination>
                  </ReactPaginateContainer>
                </> : (
                  <NotFound eliminateFilters={eliminateFilters}></NotFound>
                )

          }
        </CardsContainer>
      </div>
    </ProductsContainer>
  );
};
export default Cards;
// function removeFilter(brand: any): any {
//   throw new Error("Function not implemented.");
// }

// function chargeFilter(copyProductsList: Product[]): any {
//   throw new Error("Function not implemented.");
// }


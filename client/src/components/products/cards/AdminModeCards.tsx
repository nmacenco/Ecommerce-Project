import React, { useEffect, useState } from "react";
import Filter from "./filter/Filter";
import { CardsContainer, ReactPaginateContainer } from "./CardsStyles";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../../redux/reducers/index";
import { getProducts } from "../../../redux/actions/products";
import { Data_Paginate, FILTER_BOX, Product, Subcategory } from "../../../redux/interface";
import Loading from "../../loading/Loading";
import Categories from "../categories/Categories";
import { ProductsContainer } from "../ProductsStyles";
import AdminModeCard from "./card/AdminModeCard";
import NotFound from "../../notFound/NotFound";
import Pagination from "./pagination/Pagination";
import { chargeFilter, filterByBrand, filterProducts, removeFilter } from "../../../redux/actions/filterByCategory";
import { deleteProduct } from "../../../redux/actions/admin";

export interface ORDER {
  page: (numberOfPage: number) => void;
  orders: (typeorder: string) => void;
  AdmOrders: (typeorder: number) => void;
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
  const filteredProductList = useSelector((state: State) => state.filteredProducts.filteredProducts);

  const page = (numberOfPage: number): void => {
    setCurrentPage(numberOfPage);
  };
  const orders = (typeorder: string): void => {
    if (typeorder !== 'isActive order' && typeorder !== 'notActive order' && typeorder !== 'asc-price order' && typeorder !== 'des-price order' && typeorder !== 'des-name order' && typeorder !== 'asc-name order' && typeorder !== 'Order by order' && typeorder !== 'Active or Not order') {
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

  const AdmOrders = (typeorder: string): void => {
    setAdmOrders(typeorder);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [Admorders]);



  const finalProduct = currentPage * 32;
  const firstProduct = finalProduct - 32;
  let newProductsList: Product[] = [];
  filteredProductList.length > 0
    ? (newProductsList = filteredProductList.slice(firstProduct, finalProduct))
    : (newProductsList = copyProductsList.slice(firstProduct, finalProduct));

  const handlePageClick = (data: Data_Paginate) => {
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
              {filterBox.subcategory.length !== 0 ? <span><button onClick={() => resetFilter(filterBox.subcategory)} className="btn btn-primary mt-2 mr-2">{filterBox.subcategory}</button></span> : ""}
              {filterBox.brand.length !== 0 ? <span><button onClick={() => resetFilter(filterBox.brand)} className="btn btn-primary mt-2 mr-2">{filterBox.brand}</button></span> : ""}
              <div className="" >
                <table className="table table-hover ">
                  <thead>
                    <tr>
                      <th scope="col">Image</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">State</th>
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
                        isActive={e.isActive}
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
              </ReactPaginateContainer>
            </>
          ) : (
            <NotFound ></NotFound>
          )}
        </CardsContainer>
      </div>
    </ProductsContainer>
  )
};
export default AdminModeCards;

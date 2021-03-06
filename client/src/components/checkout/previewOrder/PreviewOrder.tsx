import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../../../helpers/useLocalStorage";
import { createOrderUser, getcurrentOrder, resetCurrentOrder } from "../../../redux/actions/ordersUser";
import { State } from "../../../redux/reducers";
import PayPalCheckoutButtons from "../payPalButton/PayPalButton";
import {
  Previewcontainer,
  AdminProductIMG,
  ColumnsContainer,
  ItemsTaxShipp,
  TableContainer,
  OrderSumaryContainer,
  OrderSumarySmallerContainer,
} from "./PreviewOrderStyles";

export default function PreviewOrder(): JSX.Element {
  const [userInStorage, setuserInStorage] = useLocalStorage('USER_LOGGED', '')
  const dispatch = useDispatch()
  const activeOrder = useSelector((state: State) => state.ordersUser.activeOrder);

  useEffect(() => {
    dispatch(getcurrentOrder(userInStorage.token));

    return () => {
      dispatch(resetCurrentOrder())
      dispatch(createOrderUser(userInStorage.token, [{
        productId: 0,
        productName: '',
        price: 0,
        image: '',
        stock: 0,
        quantity: 0,
      }]))

    }
  }, [dispatch]);
  return (
    <Previewcontainer>
      <h3 className="mt-3 mb-5">Preview Order</h3>
      <ColumnsContainer>
        <div className=" col-11 col-md-8 col-lg-8  "  >
          <div className="card bg-secondary mb-3 ">
            <div className="card-header">Shipping</div>
            <div className="card-body">
              <p className="card-text"> {activeOrder.user} </p>
              <p className="card-text"> {activeOrder.shipping_address} </p>
              <Link className="text-decoration-none" to={"/shippingAddress"}>
                Edit
              </Link>
            </div>
          </div>
          <div className="card bg-secondary mb-3 ">
            <div className="card-header">Items</div>
            <div className="table-responsive">
            <table className="table table-hover ">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Product Name</th>
                  <th scope=" col ">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              {Object.keys(activeOrder).length > 0 &&
                activeOrder.details.map((product: any, i: any) => {
                  return (
                    <tbody key={i}>
                      <tr className="table-light">
                        <th scope="row">
                          <AdminProductIMG
                            src={product.image}
                            alt={product.image}
                            className="card-img-top"
                          ></AdminProductIMG>
                        </th>
                        <td className="">
                          {product.productName.length > 30 ? (
                            <p>
                              <Link
                                className="text-decoration-none"
                                to={`/detail/${product.productId}`}
                              >
                                {product.productName.slice(0, 30)}...
                              </Link>
                            </p>
                          ) : (
                            <p className="card-title m-2 text-decoration-none">
                              <Link to={`/detail/${product.productId}`}>
                                {product.productName}
                              </Link>
                            </p>
                          )}
                        </td>
                        <td className=" card-title m-2">{product.quantity} </td>

                        <td>$ {product.price} </td>

                        <td>$ {product.quantity * product.price} </td>

                      </tr>
                    </tbody>
                  );
                })}
            </table>

            </div>
          </div>
        </div>
        <div className="col-11 col-md-5 col-lg-3 ms-3 h-25 border p-4  "  >
          <div className="card-body">
            <h4 className="card-title mb-3 ">Order Summary</h4>
            <ItemsTaxShipp>
              <p className="card-text"> Items  </p> <p>$ {activeOrder.total_amount}</p>
            </ItemsTaxShipp>
            <ItemsTaxShipp>
              <p className="card-text"> Tax  </p> <p>$ 0</p>
            </ItemsTaxShipp>
            <ItemsTaxShipp>
              <p className="card-text"> Shipping  </p> <p>$ 0</p>
            </ItemsTaxShipp>
            <ItemsTaxShipp className="fw-bold" >
              <p className="fw-bold"> Total   </p> <p className="fw-bold">$ {activeOrder.total_amount} </p>
            </ItemsTaxShipp>
            <PayPalCheckoutButtons></PayPalCheckoutButtons>
          </div>
        </div>
      </ColumnsContainer>
    </Previewcontainer>
  );
}

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
} from "./PreviewOrderStyles";

// const activeOrder = {
//   id: 25,
//   total_amount: 1254,
//   email_address: "nico@gmail.com",
//   status: "Pending",
//   user: "Nicolas Macenco",
//   userID: 5,
//   billing_address: "billingAddress",
//   shipping_address: "la direccion mas cheta de todas ",
//   details: [
//     {
//       id: 15,
//       amount: 253,
//       quantity: 2,
//       productName: "Mouse",
//       productId: 254,
//       image:
//         "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_17898_Procesador_AMD_Ryzen_5_1600_AF_Zen__12nm_AM4_Wraith_Stealth_Cooler_187bb9ab-grn.jpg",
//       price: 41,
//     },
//     {
//       id: 15,
//       amount: 253,
//       quantity: 2,
//       productName: "Mouse",
//       productId: 254,
//       image:
//         "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_17898_Procesador_AMD_Ryzen_5_1600_AF_Zen__12nm_AM4_Wraith_Stealth_Cooler_187bb9ab-grn.jpg",
//       price: 41,
//     },
//     {
//       id: 15,
//       amount: 253,
//       quantity: 2,
//       productName: "Mouse",
//       productId: 254,
//       image:
//         "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_17898_Procesador_AMD_Ryzen_5_1600_AF_Zen__12nm_AM4_Wraith_Stealth_Cooler_187bb9ab-grn.jpg",
//       price: 41,
//     },
//     // {
//     //   id: 15,
//     //   amount: 253,
//     //   quantity: 2,
//     //   productName: "Mouse",
//     //   productId: 254,
//     //   image:
//     //     "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_17898_Procesador_AMD_Ryzen_5_1600_AF_Zen__12nm_AM4_Wraith_Stealth_Cooler_187bb9ab-grn.jpg",
//     //   price: 41,
//     // },
//   ],
// };

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
      <h1>Preview Order</h1>
      {/* <ColumnsContainer className="row justify-content-center w-100"> */}
      <ColumnsContainer>
        <div className=" col-6">
          <div className="card bg-secondary mb-3 ">
            <div className="card-header">Shipping</div>
            <div className="card-body">
              {/* <h4 className="card-title">Secondary card title</h4> */}
              <p className="card-text"> {activeOrder.user} </p>
              <p className="card-text"> {activeOrder.shipping_address} </p>
              <Link className="text-decoration-none" to={"/shippingAddress"}>
                Edit
              </Link>
            </div>
          </div>
          <div className="card bg-secondary mb-3 ">
            <div className="card-header">Status</div>
            <div className="card-body">
              {/* <h4 className="card-title">Secondary card title</h4> */}
              <p className="card-text"> {activeOrder.status} </p>

            </div>
          </div>
          {/* <div className="card bg-secondary mb-3 w-50">
        <div className="card-header">Payment</div>
        <div className="card-body">
          <p className="card-text"> {activeOrder.user} </p>
          <p className="card-text"> {activeOrder.shipping_address} </p>
        </div>
      </div> */}
          <div className="card bg-secondary mb-3 ">
            <div className="card-header">Items</div>
            <table className="table table-hover ">
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Product Name</th>
                  <th scope=" col ">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Total</th>
                  {/* <th scope="col">POr las  </th> */}
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

                        {/* <td>{}</td> */}
                      </tr>
                    </tbody>
                  );
                })}
            </table>
          </div>
        </div>
        <div className="col-3 ms-3 h-25 border p-4">
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

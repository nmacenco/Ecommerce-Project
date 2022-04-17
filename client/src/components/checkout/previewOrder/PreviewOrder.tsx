import React from "react";
import { Link } from "react-router-dom";
import PayPalCheckoutButtons from "../payPalButton/PayPalButton";
import { Previewcontainer, AdminProductIMG } from "./PreviewOrderStyles";

const activeOrder = {
  id: 25,
  total_amount: 1254,
  email_address: "nico@gmail.com",
  status: "Pending",
  user: "Nicolas Macenco",
  userID: 5,
  billing_address: "billingAddress",
  shipping_address: "shippingAdress",
  details: [
    {
      id: 15,
      amount: 253,
      quantity: 2,
      productName: "Mouse",
      productId: 254,
      image:
        "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_17898_Procesador_AMD_Ryzen_5_1600_AF_Zen__12nm_AM4_Wraith_Stealth_Cooler_187bb9ab-grn.jpg",
      price: 41,
    },
    {
      id: 15,
      amount: 253,
      quantity: 2,
      productName: "Mouse",
      productId: 254,
      image:
        "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_17898_Procesador_AMD_Ryzen_5_1600_AF_Zen__12nm_AM4_Wraith_Stealth_Cooler_187bb9ab-grn.jpg",
      price: 41,
    },
    {
      id: 15,
      amount: 253,
      quantity: 2,
      productName: "Mouse",
      productId: 254,
      image:
        "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_17898_Procesador_AMD_Ryzen_5_1600_AF_Zen__12nm_AM4_Wraith_Stealth_Cooler_187bb9ab-grn.jpg",
      price: 41,
    },
    // {
    //   id: 15,
    //   amount: 253,
    //   quantity: 2,
    //   productName: "Mouse",
    //   productId: 254,
    //   image:
    //     "https://compragamer.net/pga/imagenes_publicadas/compragamer_Imganen_general_17898_Procesador_AMD_Ryzen_5_1600_AF_Zen__12nm_AM4_Wraith_Stealth_Cooler_187bb9ab-grn.jpg",
    //   price: 41,
    // },
  ],
};

export default function PreviewOrder(): JSX.Element {
  return (
    <Previewcontainer>
      <h1>Preview Order</h1>
      <div className="card bg-secondary mb-3 w-50">
        <div className="card-header">Shipping</div>
        <div className="card-body">
          {/* <h4 className="card-title">Secondary card title</h4> */}
          <p className="card-text"> {activeOrder.user} </p>
          <p className="card-text"> {activeOrder.shipping_address} </p>
          <Link className="text-decoration-none" to={'/shippingAddress'} >Edit</Link>
        </div>
      </div>
      {/* <div className="card bg-secondary mb-3 w-50">
        <div className="card-header">Payment</div>
        <div className="card-body">
          <p className="card-text"> {activeOrder.user} </p>
          <p className="card-text"> {activeOrder.shipping_address} </p>
        </div>
      </div> */}
      <div className="card bg-secondary mb-3 w-50">
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
          {activeOrder &&
            activeOrder.details.map((product) => {
              return (
                <tbody>
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
                            to={`/detail/${product.id}`}
                          >
                            {product.productName.slice(0, 30)}...
                          </Link>
                        </p>
                      ) : (
                        <p className="card-title m-2 text-decoration-none">
                          <Link to={`/detail/${product.id}`}>
                            {product.productName}
                          </Link>
                        </p>
                      )}
                    </td>
                    <td className=" card-title m-2" >{product.quantity} </td>

                    <td>$ {product.price} </td>

                    <td>$ {product.quantity * product.price} </td>

                    {/* <td>{}</td> */}
                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>
        <PayPalCheckoutButtons></PayPalCheckoutButtons>
    </Previewcontainer>
  );
}

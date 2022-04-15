import React from "react";
import { Previewcontainer } from "./PreviewOrderStyles";



const     activeOrder = {
    id: 25  ,
    total_amount: 1254  ,
    email_address: 'nico@gmail.com',
    status: 'Pending',
    user: 'Nicolas Macenco',
    userID: 5,
    billing_address: 'billingAddress',
    details: [
        {
            id: 15,
            amount: 253,
            quantity: 2,
            productName: 'Mouse',
            productId: 254,
            image: 'String',
            price: 41 ,
        },
        {
            id: 15,
            amount: 253,
            quantity: 2,
            productName: 'Mouse',
            productId: 254,
            image: 'String',
            price: 41 ,
        },
        {
            id: 15,
            amount: 253,
            quantity: 2,
            productName: 'Mouse',
            productId: 254,
            image: 'String',
            price: 41 ,
        },
        {
            id: 15,
            amount: 253,
            quantity: 2,
            productName: 'Mouse',
            productId: 254,
            image: 'String',
            price: 41 ,
        },
    ]

  };

export default function PreviewOrder(): JSX.Element {
  return (
    <Previewcontainer>
        <h1>Previe Order</h1>
      <div className="card bg-secondary mb-3">
        <div className="card-header">Header</div>
        <div className="card-body">
          <h4 className="card-title">Secondary card title</h4>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
    </Previewcontainer>
  );
}

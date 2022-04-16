import React, { useState, useEffect } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
// import { getError } from '../helpers/utils';
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
export default function PayPalCheckoutButtons(props : any) {
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
    const { order } = props;
    const [paidFor, setPaidFor] = useState(false);

    function createOrder(data : any , actions : any ) {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: { value: 1254 }, // agregar el monto correspondiente
                    },
                ],
            });
    }

    function handleAprove(orderID : any ) {
        try {
            
            // Action to update the order with the data returned
            //despachar action con orderID de paypal y id de orden USAR FUNCION UPDATE ORDER
            // orderRouter.put("/auth/:id/pay", isLoggedIn, updatePaypalOrder);
            
            //if response is success
            
            setPaidFor(true);
        } catch (error) {


            console.log(error);
            
        }

        //Refresh user's account or suscription status

        //if the response us an error
        //Alert with the right response.
    }

    // if (paidFor) {
    //     // display success message, modal or redirect to the succes pag
    //     alert("Thenk you for your purchase");
    // }
    const onApprove = async (data : any , actions : any ) => {
        try {
            const order = await actions.order.capture();
             handleAprove(data.orderID);
        } catch (err) {
            // toast.error(getError(err));
        }
    };

    function onCancel() {
        toast.error("The action was canceled !!");
    }

    function onError(err : any) {
        toast.error(err.message);
    }

    const loadPayPalScript = async (clientId : any ) => {

        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'USD',
          },
        });
        // paypalDispatch({ type: 'setLoadingStatus', value: 'Pending' }); ver que onda el value 
      };

    useEffect(() => {
        loadPayPalScript(process.env.REACT_APP_PAYPAL_CLIENT_ID);
    }, []);

    return (
        <PayPalButtons
            style={{
                color: "silver",
                layout: "horizontal",
                height: 48,
                tagline: false,
                shape: "pill"
            }}
            createOrder={createOrder}
            onApprove={onApprove}
            onCancel={onCancel}
            onError={onError}
        />
    );
}
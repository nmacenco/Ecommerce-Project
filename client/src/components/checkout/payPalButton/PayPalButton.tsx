import React, { useState, useEffect } from 'react';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
// import { getError } from '../helpers/utils';

export default function PayPalCheckoutButtons(props : any) {
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
    const { order } = props;
    const [paidFor, setPaidFor] = useState(false);

    function createOrder(data : any , actions : any ) {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: { value: order.totalPrice },
                    },
                ],
            });
    }

    function handleAprove() {
        // Action to update the order with the data returned

        //if response is success

        setPaidFor(true);

        //Refresh user's account or suscription status

        //if the response us an error
        //Alert with the right response.
    }

    if (paidFor) {
        // display success message, modal or redirect to the succes pag
        alert("Thenk you for your purchase");
    }
    const onApprove = async (data : any , actions : any ) => {
        try {
            const order = await actions.order.capture();
            // handleAprove(data.orderID);
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
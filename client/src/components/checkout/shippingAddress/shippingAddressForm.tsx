import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getCountries } from "../../../redux/actions/countries";
import { State } from "../../../redux/reducers";
import { errorsCheck } from "./validations";
import { Form, FormContainer } from "./shippingAdressFormStyles";
import swal from "sweetalert";
import { getcurrentOrder, updateOrderUser } from "../../../redux/actions/ordersUser";
import { useLocalStorage } from "../../../helpers/useLocalStorage";

export default function ShippingAddressForm(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userInStorage , setuserInStorage] = useLocalStorage('USER_LOGGED','')
  const userState = useSelector((state: State) => state.user);
  const activeOrder = useSelector((state: State) => state.ordersUser.activeOrder);
  const countries = useSelector((state: State) => state.countries.countries);


  const [errorsList, setErrorsList] = useState<any>(false)

    const [address , setAdress] = useState({
        // name : '',
        address : '',
        city : '',
        postalCode : '',
        // country : ''
    })
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getcurrentOrder(userInStorage.token));
  }, [dispatch]);

  console.log(activeOrder);
  

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
      setAdress({
        ...address,
        [e.target.name]: e.target.value,
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    let errors = errorsCheck(address);
    setErrorsList(errors)
    if (errors === false) {
      const shipping_address = {shipping_address : `${address.address}-${address.city}-${address.postalCode}`}
      if (activeOrder) {
        dispatch(updateOrderUser(activeOrder.id , shipping_address, userState!.token )) 
      }
      // dispatch(updateOrderUser( 1 , shipping_address, userState!.token )) 
      swal({
        title: "Address correctly created",
        icon: "success",
        buttons: {
          confirm: true,
        },
      }).then((value) => {
        if (value) {
          navigate('/previewOrder')
        }
      })
    } else {
      swal({
        title: "All field are required.",
        icon: "error"
      })
    }

  };

  return (
    <FormContainer>
      {/* <Form className="w-25" onSubmit={handleSubmit}> */}
      <form className="" onSubmit={handleSubmit}>
        <h3 className="text-center">Shipping Address</h3>
        {/* <div className="form-group">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="staticEmail"
            name="name"
            //   value={product.name}
            placeholder="Enter name"
            onChange={(e) => handleChange(e)}
          />
          <p className="text-danger">{errorsList.name ? errorsList.name : "⠀"}</p>
        </div> */}
        <div className="form-group">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="staticEmail"
            name="address"
            //   value={product.name}
            placeholder="Enter address"
            onChange={(e) => handleChange(e)}
          />
          {/* <p className="text-danger">{errorsList.name ? errorsList.name : "⠀"}</p> */}
        </div>
        <div className="form-group mt-4">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="staticEmail"
            name="city"
            //   value={product.name}
            placeholder="Enter city"
            onChange={(e) => handleChange(e)}
          />
          {/* <p className="text-danger">{errorsList.name ? errorsList.name : "⠀"}</p> */}
        </div>
        <div className="form-group mt-4">
          <label htmlFor="staticEmail" className="col-form-label">
            Postal Code 
          </label>
          <input
            type="text"
            className="form-control"
            id="staticEmail"
            name="postalCode"
            //   value={product.name}
            placeholder="Enter postal code"
            onChange={(e) => handleChange(e)}
          />
          {/* <p className="text-danger">{errorsList.name ? errorsList.name : "⠀"}</p> */}
        </div>

        <div className="text-center mb-4">
          <button type="submit" className="btn btn-outline-primary mt-5 ">
            Submit
          </button>
        </div>
      </form>
    </FormContainer>
  );
}

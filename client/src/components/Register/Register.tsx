import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator, { validateForms } from "../../helpers/validateForm";
import { CreateUser, RegisterWithGoogle } from "../../redux/actions/user";
import { State } from "../../redux/reducers";
import Form from "../form/Form";
import { useNavigate } from "react-router";
import { getCountries } from "../../redux/actions/countries";
import swal from "sweetalert";
import GoogleLogin from "react-google-login";
import { getPendingOrder } from "../../redux/actions/cart";
import { createOrderUser } from "../../redux/actions/ordersUser";
import { setPage } from "../../redux/actions/setPage";

interface Inputs {
  name: string;
  lastname: string;
  email: string;
  passUser: string;
  // billing_address: string;
  // default_shipping_address: string;
  countryId: string;
}

const Register = (): JSX.Element => {
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.user);
  const productsCart = useSelector((state: State) => state.cart.cart);
  const [userLoaded, setUserLoaded] = useState<boolean>(false);
  const countries = useSelector((state: State) => state.countries.countries);
  const navigate = useNavigate();

  const [inputs, setInputs] = useState<Inputs>({
    email: "",
    lastname: "",
    name: "",
    passUser: "",
    // billing_address: "",
    // default_shipping_address: "",
    countryId: "",
  });
  const [error, setError] = useState<Inputs>({
    email: "",
    lastname: "",
    name: "",
    passUser: "",
    // billing_address: "",
    // default_shipping_address: "",
    countryId: "",
  });
  // const [countries, setCountries] = useState<Array<any>>([])

  useEffect(() => {
    dispatch(getCountries());
    dispatch(setPage(0));
    return () => {
      dispatch(setPage(1));
    };

  }, []);


  const FormChange = (event: any) => {
    event.preventDefault();
    const errores = validator(error, event.target);
    setInputs({
      ...inputs,
      [event.target.name]: event.target.value,
    });
    setError(errores as Inputs);
  };

  const checkError = (prop: string): string => {
    return prop ? "form-control is-invalid" : "form-control";
  };

  const RegisterFetch = (event: any) => {
    event.preventDefault();
    const res = validateForms(error, inputs);

    if (res) {
      return alert(res);
    }
    const newUser = {
      name: inputs.name,
      surname: inputs.lastname,
      email: inputs.email,
      password: inputs.passUser,
      // billing_address: inputs.billing_address,
      // default_shipping_address: inputs.default_shipping_address,
      CountryId: Number(inputs.countryId),
    };
    if (!user) {
      dispatch(
        CreateUser(newUser, () => {
        })
      );
      swal({
        text: "Please check your inbox to validate your account.",
        icon: "success",
      })
      navigate("/login")
    }
  };

  const responseGoogle = (data: any) => {
    const { givenName, familyName, email } = data.profileObj;
    let newUser = {
      name: givenName ? givenName : '',
      surname: familyName ? familyName : '',
      email: email,
      CountryId: 1,
      password: null
    };

    dispatch(RegisterWithGoogle(newUser, (error) => {
      if (error) {
        swal({
          title: 'Oops! an error occurred',
          text: error,
          icon: 'error'
        })

      } else {
        swal({
          title: 'Succesfully registed.',
          icon: 'success'
        })
        setUserLoaded(true);
      }
    }));
  }

  // if (user) {
  //   navigate('/products');
  //   dispatch(createOrderUser(user.token, productsCart));
  //   dispatch(getPendingOrder(user.token));
  // }
  const CreateOrder = () => { // FUNCIONA PERFECTO, TESTEADO HASTA LA COMPRA 
    if (user) {
     console.log(user);
      dispatch(createOrderUser(user.token, productsCart));
    } 
    setTimeout (()=>{
      navigate("/products");
      
    },200)
  }
  
  const rejectGoogle = (error: any) => {
    console.log(error);
    swal({
      title: 'Oops! an error occurred',
      text: error,
      icon: 'error'
    })
  }

  return (
    <Form title="Register">
      <div className="div-data">
        <div>
          <input
            type="text"
            placeholder="Name..."
            name="name"
            onChange={FormChange}
            className={checkError(error.name)}
          />
          {error.name && <b className="invalid-feedback">{error.name}</b>}
        </div>
        <div>
          <input
            type="text"
            placeholder="LastName..."
            name="lastname"
            onChange={FormChange}
            className={checkError(error.lastname)}
          />
          {error.lastname && (
            <b className="invalid-feedback">{error.lastname}</b>
          )}
        </div>
        <div>
          <select
            className="form-select"
            id="select"
            name="countryId"
            onChange={FormChange}
          >
            {countries.length &&
              countries.map((country: any, i: number) => {
                return (
                  <option value={country.id} key={country.id}>
                    {country.name}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
      <div className="div-inputs">
        <div>
          <input
            type="email"
            placeholder="Email..."
            name="email"
            onChange={FormChange}
            className={checkError(error.email)}
          />
          {error.email && <b className="invalid-feedback">{error.email}</b>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password..."
            name="passUser"
            onChange={FormChange}
            className={checkError(error.passUser)}
          />
          {error.passUser && (
            <b className="invalid-feedback">{error.passUser}</b>
          )}
        </div>
      </div> 
      <div className="form-log" >
        <GoogleLogin
          clientId="1023767179189-ja36amq223qs81bf8m8ph3rucekvajoi.apps.googleusercontent.com"
          buttonText="Register"
          onSuccess={responseGoogle}
          onFailure={rejectGoogle}
          cookiePolicy={'single_host_origin'}
          style={{ width: '100% !important' }}
        />
      </div>
      <div className="text-center m-3">
        {validateForms(error, inputs).length ? (
          <button className="btn btn-primary button-links link-Router mx-2" disabled>
            Submit
          </button>
        ) : (
          <button
            className="btn btn-primary button-links link-Router mx-2"
            onClick={RegisterFetch}
          >
            Submit
          </button>
        )}
        <Link
          to="/login"
          className="btn btn-secondary link-Router button-links mx-2"
        >
          Login
        </Link>
      </div>

      <button
        className="btn btn-primary button-links link-Router mx-2"
        onClick={CreateOrder}
        >
        Go back to Products
      </button>
    </Form>
  );
};

export default Register;

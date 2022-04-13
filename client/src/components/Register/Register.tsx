import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator, { validateForms } from "../../helpers/validateForm";
import { CreateUser, IdentGoogle } from "../../redux/actions/user";
import { State } from "../../redux/reducers";
import Form from "../form/Form";
import { useNavigate } from "react-router";
import { getCountries } from "../../redux/actions/countries";
import swal from "sweetalert";

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
    // alert("envio de info");

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
    // console.log('USUARIO: ', newUser);
    if (!user) {
      dispatch(
        CreateUser(newUser, () => {
        })
        );
          swal({
            text: "Please check your inbox to validate your account",
            icon: "success",
          })
    }
  };

  const SinUpGoogle = () => {
    dispatch(
      IdentGoogle("/signInWithGoogle", () => {
        navigate("/products");
      })
    );
  };

  useEffect(() => {
    dispatch(getCountries());
    // fetch('http://localhost:3001/api/countries')
    //     .then(res => res.json())
    //     .then(data => {
    //         // console.log(data.countries)
    //         data.countries && setCountries(data.countries);
    //     })
    //     .catch(error => console.log(error))
  }, []);

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
          {/* <input type='text' placeholder='Country id' name='countryId' onChange={FormChange} className={checkError(error.countryId)} />
                    {error.countryId && <b className='invalid-feedback'>{error.countryId}</b>} */}
          {/* <div className="form-group"> */}
          <select
            className="form-select"
            id="select"
            name="countryId"
            onChange={FormChange}
          >
            {countries.length &&
              countries.map((country : any, i : number) => {
                return (
                  <option value={country.id} key={country.id}>
                    {country.name}
                  </option>
                );
              })}
          </select>
          {/* </div> */}
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

      {/* <div>
        <input
          type="text"
          placeholder="Shipping Address..."
          name="billing_address"
          onChange={FormChange}
          className={checkError(error.billing_address)}
        />
        {error.billing_address && (
          <b className="invalid-feedback">{error.billing_address}</b>
        )}
      </div> */}
      {/* <div>
        <input
          type="text"
          placeholder="Default shipping address..."
          name="default_shipping_address"
          onChange={FormChange}
          className={checkError(error.default_shipping_address)}
        />
        {error.default_shipping_address && (
          <b className="invalid-feedback">{error.default_shipping_address}</b>
        )}
      </div> */}
      <div className="google form-log" onClick={SinUpGoogle}>
        <div>
          <img src="https://freesvg.org/img/1534129544.png" />
        </div>
        <span>Continue with Google</span>
      </div>
      <article>
        {validateForms(error, inputs).length ? (
          <button className="btn btn-primary button-links link-Router" disabled>
            Submit
          </button>
        ) : (
          <button
            className="btn btn-primary button-links link-Router"
            onClick={RegisterFetch}
          >
            Submit
          </button>
        )}
        <Link
          to="/login"
          className="btn btn-secondary link-Router button-links"
        >
          Login
        </Link>
      </article>
    </Form>
  );
};

export default Register;

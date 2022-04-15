import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useLocalStorage } from "../../../helpers/useLocalStorage";
import { getCountries } from "../../../redux/actions/countries";
import { State } from "../../../redux/reducers";
import { errorsCheck } from "../../form/validations";
import { FormContainer } from "./shippingAdressFormStyles";

export default function ShippingAddressForm(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state: State) => state.countries.countries);

  useEffect(() => {
    dispatch(getCountries());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ): void => {
    //   setProduct({
    //     ...product,
    //     [e.target.name]: e.target.value,
    //   });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <FormContainer>
      <form className="w-25" onSubmit={handleSubmit}>
        <h3 className="text-center">Shipping Address</h3>
        <div className="form-group">
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
          {/* <p className="text-danger">{errorsList.name ? errorsList.name : "⠀"}</p> */}
        </div>
        <div className="form-group">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Address
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
          {/* <p className="text-danger">{errorsList.name ? errorsList.name : "⠀"}</p> */}
        </div>
        <div className="form-group">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            City
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
          {/* <p className="text-danger">{errorsList.name ? errorsList.name : "⠀"}</p> */}
        </div>
        <div className="form-group">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Postal Code 
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
          {/* <p className="text-danger">{errorsList.name ? errorsList.name : "⠀"}</p> */}
        </div>
        <div className="form-group">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">
            Country
          </label>
          <select
            className="form-select"
            id="select"
            name="countryId"
            // onChange={FormChange}
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

        <div className="text-center">
          <button type="submit" className="btn btn-outline-primary mt-5 ">
            Submit
          </button>
        </div>
      </form>
    </FormContainer>
  );
}

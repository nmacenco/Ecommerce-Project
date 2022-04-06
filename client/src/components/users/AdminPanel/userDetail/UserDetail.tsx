import React, { useState, useEffect } from "react";
import { Switch } from "./UserDetailStyles";

interface props {
  id: number;
  name: string;
  email: string;
  billing_address: string;
  default_shipping_address: string;
  role: string;
  isActive: boolean;
  country: string;
  countryCode: string;
  CountryId: number;
}

const UserDetail = ({
  id,
  name,
  email,
  billing_address,
  default_shipping_address,
  role,
  isActive,
  country,
  countryCode,
  CountryId,
}: props) => {
  const [userUpdate, setUserUpdate] = useState( {
    id,
    name,
    email,
    billing_address,
    default_shipping_address,
    role,
    isActive,
    country,
    countryCode,
    CountryId,
  });

    console.log(userUpdate);
    
  function isActiveOnChange(e: any): void {
    e.preventDefault();
    console.log(e);
    console.log(e.target.value);
  }
  return (
    <tbody>
      <tr className="table-light">
        <th scope="row">{name}</th>
        <td className="form-group">
          <select className="form-select" id="exampleSelect1">
            <option>User</option>
            <option>Admin</option>
          </select>
        </td>
        <td>
          <div className="form-check form-switch">
            <input
              value={"prueba"}
              className="form-check-input"
              type="checkbox"
              id="flexSwitchCheckChecked"
              onChange={(e) => isActiveOnChange(e)}
            />
            {/* <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Checked switch checkbox input</label> */}
          </div>
          {/* <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={(e)=> isActiveOnChange(e)}  value={'prueba'}/>
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Default switch checkbox input</label>
      </div> */}
        </td>

        <td>
          <button
            //   onClick={(e)=> handleClickEdit(e)}
            type="button"
            className="btn btn-warning btn-sm"
          >
            Reset
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default UserDetail;

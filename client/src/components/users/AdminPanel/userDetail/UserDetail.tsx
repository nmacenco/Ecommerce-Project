import React, { useState, useEffect } from "react";
import swal from "sweetalert";
interface props {
  id: number;
  name: string;
  surname: string;
  email: string;
  billing_address: string;
  default_shipping_address: string;
  role: string;
  isActive: boolean;
  country: string;
  countryCode: string;
  CountryId: number;
  password : string ; 

}

const UserDetail = ({
  id,
  name,
  password,
  surname,
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

    function roleOnChange (e:any) : void {
      e.preventDefault()
      swal({
        title: "Are you sure?",
        text: "Do you want to change this user role?",
        icon: "warning",
        dangerMode: true,
        buttons: {
          cancel: true,
          confirm: true
        }
      }).then((value) => {
        if (value) {
          setUserUpdate({...userUpdate , role: e.target.value})
          // aca tengo que despachar la accion para updeitear jaja 
          swal({
            text: "Role changed",
            icon: "success"
          })
        }
      })
    }
    console.log(userUpdate);
    function isActiveOnChange(e: any): void {
      e.preventDefault();
      if (e.target.value === 'true' ) {
        setUserUpdate({...userUpdate , isActive: false})
      }else if (e.target.value === 'false' ) {
        setUserUpdate({...userUpdate , isActive: true})
      }
    }
    
    function handleClickReset(e:any) : void {
      /// aca deberia despachar otra accion 
    }


  return (
    <tbody>
      <tr className="table-light">
        <th scope="row">{name}</th>
        <td className="form-group">
          <select onChange={(e)=> roleOnChange(e)} defaultValue={userUpdate.role} className="form-select" id="exampleSelect1">
            <option disabled hidden>
              {userUpdate.role}
            </option>
            <option value = {'admin'}>Admin</option>
            <option value = {'user'}>User</option>
          </select>
        </td>
        <td>
          <div className="form-check form-switch">
            <input
              value={`${isActive}`}
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
              onClick={(e)=> handleClickReset(e)}
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

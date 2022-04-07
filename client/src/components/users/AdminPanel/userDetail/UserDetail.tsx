import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
import { adminEditUser } from "../../../../redux/actions/adminUser";
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
  needsPasswordReset : boolean ; 
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
  needsPasswordReset
}: props) => {
  const dispatch = useDispatch()

  const [userUpdate, setUserUpdate] = useState( {
    name,
    email,
    surname,
    billing_address,
    default_shipping_address,
    role,
    isActive,
    country,
    countryCode,
    CountryId,
    needsPasswordReset
  });

    function  roleOnChange (e:any) {
      e.preventDefault()
      // console.log(e.target.id);
      
      setUserUpdate({...userUpdate , role: e.target.value})
      swal({
        title: "Are you sure?",
        text: "Do you want to change this user role?",
        icon: "warning",
        dangerMode: true,
        buttons: {
          cancel: true,
          confirm: true
        }
      }).then( (value) => {
        if (value) {
          e.target.value === 'admin' ?
          dispatch(adminEditUser( e.target.id ,{
            role : 'admin',
            isActive,
            needsPasswordReset

          }))
          :
          dispatch(adminEditUser( e.target.id ,{
            name,
            email,
            surname,
            billing_address,
            default_shipping_address,
            role : 'user',
            isActive,
            country,
            countryCode,
            CountryId,
          }));
          swal({
            text: "Role changed",
            icon: "success"
          })
        }
      })
    }
    
    function isActiveOnChange(e: any): void {
      e.preventDefault();
      if (e.target.value === 'true' ) {
        setUserUpdate({...userUpdate , isActive: false})
        dispatch(adminEditUser( e.target.id ,{
          name,
          email,
          surname,
          billing_address,
          default_shipping_address,
          role ,
          isActive: false,
          country,
          countryCode,
          CountryId,
        }))
      }else if (e.target.value === 'false' ) {
        setUserUpdate({...userUpdate , isActive: true})
        dispatch(adminEditUser( e.target.id ,{
          name,
          email,
          surname,
          billing_address,
          default_shipping_address,
          role ,
          isActive: true,
          country,
          countryCode,
          CountryId,
        }))
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
          <select  onChange={(e)=> roleOnChange(e)} defaultValue={userUpdate.role} className="form-select" id={`${id}`} >
            <option disabled hidden>
              {userUpdate.role}
            </option>
            <option  value = {'admin'}>Admin</option>
            <option value = {'user'}>User</option>
          </select>
        </td>
        <td>
          <div className="form-check form-switch">
            <input
              value={`${isActive}`}
              className="form-check-input"
              type="checkbox"
              id={`${id}`}
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

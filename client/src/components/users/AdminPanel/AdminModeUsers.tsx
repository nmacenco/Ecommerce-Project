import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetUsers } from "../../../redux/actions/adminUser";
import { AdminUsersContainer, ListContainer } from "./AdminModeUsersStyles";
import { State } from "../../../redux/reducers/index";
import { Users } from "../../../redux/interface";
import UserDetail from "./userDetail/UserDetail";



const AdminUserMode = (): JSX.Element => {
    const dispatch = useDispatch()
    const users = useSelector((state: State) => state.adminUsers.users);
    const [Admorders, setAdmOrders] = useState<string>("");
    useEffect ( ()=> {
      setTimeout(() => {
        dispatch(adminGetUsers())
      }, 500)
    }, [Admorders])
    

    const AdmOrders = (typeorder: string): void => {
      setAdmOrders(typeorder);
    };

    
    
    return(
        <AdminUsersContainer>
            <ListContainer >
             <h1>User Controller</h1>
                <div className="" >
                <table className="table table-hover ">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Role</th>
                      <th scope="col">IsActive</th>
                      <th scope="col">Password Reset </th>
                    </tr>
                  </thead>
                  {users.map( user  => {
                    return (
                      <UserDetail
                        id={user.id}
                        surname = {user.surname}
                        password = {user.password}
                        name={user.name}
                        email = {user.email}
                        billing_address = {user.billing_address}
                        default_shipping_address = {user.default_shipping_address}
                        role = {user.role}
                        isActive={user.isActive}
                        country = {user.country}
                        countryCode = {user.countryCode}
                        CountryId = {user.CountryId}
                        needsPasswordReset = {user.needsPasswordReset}
                        AdmOrders ={AdmOrders}
                      />
                    );
                  })}
                </table>
                  );
              </div> 

            </ListContainer>
            
        </AdminUsersContainer>
    )
}

export default AdminUserMode ; 
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetUsers } from "../../../redux/actions/adminUser";
import { AdminUsersContainer } from "./AdminModeUsersStyles";
import { State } from "../../../redux/reducers/index";
import { Users } from "../../../redux/interface";
import UserDetail from "./userDetail/UserDetail";



const AdminUserMode = (): JSX.Element => {
    const dispatch = useDispatch()
    const users = useSelector((state: State) => state.adminUsers.users);
    useEffect ( ()=> {
        console.log('se despacha');
        
        dispatch(adminGetUsers())
    }, [])
    

    console.log(users);
    
    return(
        <AdminUsersContainer>
            <div>
             <h1>Estamos en el user Controller</h1>
                <div className="" >
                <table className="table table-hover ">
                  <thead>
                    <tr>
                      <th scope="col">Image</th>
                      <th scope="col">Product Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Delete</th>
                      <th scope="col">Edit </th>
                    </tr>
                  </thead>
                  {users.map( user  => {
                    return (
                      <UserDetail
                      
                        name={user.name}
                        isActive={user.isActive}
                        id={user.id}
                        role = {user.role}
                      />
                    );
                  })}
                </table>
                  );
              </div> 

            </div>
            
        </AdminUsersContainer>
    )
}

export default AdminUserMode ; 
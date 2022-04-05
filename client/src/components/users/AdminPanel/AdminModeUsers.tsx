import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetUsers } from "../../../redux/actions/adminUser";
import { AdminUsersContainer } from "./AdminModeUsersStyles";
import { State } from "../../../redux/reducers/index";



const AdminUserMode = (): JSX.Element => {
    const dispatch = useDispatch()
    const users = useSelector((state: State) => state.adminUsers);
    useEffect ( ()=> {
        console.log('se despacha');
        
        dispatch(adminGetUsers())
    }, [])

    console.log(users);
    
    return(
        <AdminUsersContainer>

            <h1>Estamos en el user Controller</h1>
                {/* div className="" >
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
                  {newProductsList.map((e: Product) => {
                    return (
                      <AdminModeCard
                        name={e.name}
                        image={e.image}
                        price={e.price}
                        id={e.id}
                        AdmOrders = {AdmOrders}
                        page={page}
                      />
                    );
                  })}
                </table>
                  );
              </div> */}
            
        </AdminUsersContainer>
    )
}

export default AdminUserMode ; 
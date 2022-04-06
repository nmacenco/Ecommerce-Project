import React, {useState , useEffect} from "react";



interface props {
    name: string;
    isActive: boolean;
    role: string;
    id: number;
  }

const UserDetail = ({name, isActive , role , id } : props) => {
    return (
        <tbody >
        <tr className="table-light">
          <th scope="row">
                {name}
          </th>
          <td >
              {role}
            {/* {name.length > 30 ? (
                <p className=""><Link to={`/detail/${id}`}>{name.slice(0, 30)}...</Link></p> 
            ) : (
              <p className="card-title m-2"><Link to={`s/detail/${id}`}>{name}</Link></p>
            )} */}
          </td>
          <td >  {isActive} </td>
          <td >
            <button
            //   onClick={(e)=> {deleteHandler(e)}}
              type="button"
              className="btn btn-danger btn-sm  "
            >
              Delete
            </button>
          </td>
          <td >
              <button 
            //   onClick={(e)=> handleClickEdit(e)} 
              type="button" className="btn btn-warning btn-sm">
                Edit
              </button>
          </td>
        </tr>
      </tbody>
    )
}

export default UserDetail ;
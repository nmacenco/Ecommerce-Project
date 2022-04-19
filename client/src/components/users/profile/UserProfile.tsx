import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorage } from "../../../helpers/useLocalStorage";
import { getSingleUser } from "../../../redux/actions/user";
import { ButtonBox, Container, ProfileContainer } from "./UserProfileStyles";
import { State } from "../../../redux/reducers";
import { Link } from "react-router-dom";

interface userDetail {
  name: string;
}

const UserProfile = () => {
  const dispatch = useDispatch();
  const [userInStorage, setuserInStorage] = useLocalStorage("USER_LOGGED", "");
  const userDetail = useSelector((state: State) => state.userDetail.userDetail);

  useEffect(() => {
    dispatch(getSingleUser(userInStorage.token));
  }, []);
  console.log(userInStorage.google)

  return (
    <Container>
      <ProfileContainer>
        <div className="card text-center h-100 w-100">
          <h3 className="card-header">Profile</h3>
          <div className="card-body d-flex flex-column justify-content-center align-items-center">
            <h4 className="card-title mt-4">
              {userDetail.name} {userDetail.surname}
            </h4>
            <p className="card-text mt-3">Email: {userDetail.email}</p>
            <p className="card-text ">Country: {userDetail.country}</p>
            {/* <p className="card-text">Billing adress : {userDetail.billing_address}</p> */}
            {/* <p className="card-text mb-5">Shipping Adress: {userDetail.default_shipping_address}</p> */}
            <ButtonBox className="d-flex flex-column flex-lg-row justify-content-around ">
              {
                !userInStorage.google && <Link to={"/resetpwd"} className="btn btn-primary">
                  Edit Password
                </Link>
              }
              <Link
                to={`/editUser/${userInStorage.token}`}
                className="btn btn-primary mt-2 mt-lg-0"
              >
                Edit Profile
              </Link>
            </ButtonBox>
          </div>
          <div className="card-footer text-muted"></div>
        </div>
      </ProfileContainer>
    </Container>
  );
};

export default UserProfile;

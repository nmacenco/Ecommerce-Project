import React from "react";
import { useNavigate } from "react-router";
import { Container } from "./EmailResetPasswordStyles";
import swal from "sweetalert";

export default function ValidateAccount(): JSX.Element {
  const navigate = useNavigate();
  function handleSubmit() {
    navigate("/login");
  }
  function handleOnClick() {
    swal({
      text: "Your account was validated, please login",
      icon: "success",
      buttons: {
        confirm: true,
      },
    }).then((value) => {
      if (value) {
        navigate("/login");
      }
    });
  }
  return (
    <Container>
      <div className="card-body">
        <form
          onSubmit={() => {
            handleSubmit();
          }}
        >
          <h3 className="text-center">Validate Account</h3>
          <div className="text-center">
            <button
              onClick={(e) => {
                handleOnClick();
              }}
              type="submit"
              className="btn btn-outline-primary mt-5 "
            >
              Click here
            </button>
          </div>
        </form>
      </div>
    </Container>
  );
}


import React from "react";
import { Container } from "./EmailResetPasswordStyles";



export default function ValidateAccount(): JSX.Element {

    function handleOnClick ( ) {

    }
    return (
        <Container>

          <div className="card-body">
            <form >
              <h3 className="text-center">Validate Account</h3>

  
              <div className="text-center">
                <button onClick={(e) => { handleOnClick() }} type="submit" className="btn btn-outline-primary mt-5 ">
                  Click here
                </button>
              </div>
            </form >
          </div >

        </Container>
    );
  }
  
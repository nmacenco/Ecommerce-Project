import React from "react";

import { Container, FormContainer1 } from "./EmailResetPasswordStyles";

export default function EmailResetPassword(): JSX.Element {

  function handleSubmit (){
    
  }
  return (
    <Container>
      <FormContainer1>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <h3 className="text-center">Reset password</h3>
            <div className="form-group">
              <label htmlFor="staticEmail" className=" col-form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="staticEmail"
                name="name"
                // value={}
                placeholder="Type your email"
                onChange={(e) => (e)}
              />
              <p className="text-danger">
                {/* {errorsList.name ? errorsList.name : "⠀"} */}
              </p>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-outline-primary mt-5 ">
                Submit
              </button>
            </div>
          </form>
        </div>
      </FormContainer1>
    </Container>
  );
}

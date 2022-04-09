import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocalStorage } from "../../helpers/useLocalStorage";
import { forgotPasswordReset } from "../../redux/actions/user";

import { Container, FormContainer1 } from "./EmailResetPasswordStyles";

// export function validate (theEmail : any )  {

// }

export default function EmailResetPassword(): JSX.Element {
  const dispatch = useDispatch()

  const [error, setError] = useState({
    email: '',
})
  const [theEmail , setTheEmail ] = useState({
    email :  ''
  })
  // function handleOnBlur(e) {
  //   setError(
  //     validate(theEmail.email)
  //   );
  // }
  function handleOnChange (e : any ){
    e.preventDefault()
    setTheEmail({
      email: e.target.value
    })

  }
  
  function handleSubmit (){
    dispatch(forgotPasswordReset(theEmail))
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
                onChange={(e) => handleOnChange(e)}
              />
              <p className="text-danger">
                {/* {errorsList.name ? errorsList.name : "⠀"} */}
              </p>
            </div>

            <div className="text-center">
              <button onClick={()=> {handleSubmit()}} type="submit" className="btn btn-outline-primary mt-5 ">
                Submit
              </button>
            </div>
          </form>
        </div>
      </FormContainer1>
    </Container>
  );
}

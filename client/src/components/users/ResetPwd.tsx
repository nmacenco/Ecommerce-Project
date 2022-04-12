import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router';
import swal from 'sweetalert';
import { useLocalStorage } from '../../helpers/useLocalStorage';
import { LogoutUser, resetPassword } from '../../redux/actions/user';
import { FormContainer } from '../form/FormCreateStyles'

export interface PWD {
    actualPassword: string;
    password: string;
    passwordConfirm: string;
}

export function ResetPwd(): JSX.Element {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [useInStorage, setUseInStorage] = useLocalStorage("USER_LOGGED", "")
    const [resetPwd, setResetPwd] = useState<PWD>({
        actualPassword: "",
        password: "",
        passwordConfirm: "",
    })

    const showError = (resetPwd: PWD): boolean => {
        let bool: boolean = false

        if (resetPwd.actualPassword.length === 0) { bool = true; (document.getElementById("actualPassword") as HTMLInputElement).textContent = "Old password missing" }
        else (document.getElementById("actualPassword") as HTMLInputElement).textContent = ""

        if (resetPwd.password.length === 0) { bool = true; (document.getElementById("password") as HTMLInputElement).textContent = "New password missing" }
        else (document.getElementById("password") as HTMLInputElement).textContent = ""

        if (resetPwd.passwordConfirm.length === 0) { bool = true; (document.getElementById("passwordConfirm") as HTMLInputElement).textContent = "Confirm password missing" }
        else if (resetPwd.passwordConfirm !== resetPwd.password) { bool = true; (document.getElementById("passwordConfirm") as HTMLInputElement).textContent = "Don't match passwords" }
        else (document.getElementById("passwordConfirm") as HTMLInputElement).textContent = ""
        return bool
    }

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault()
        setResetPwd({
            ...resetPwd,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        const error = showError(resetPwd)
        if (!error) {
            dispatch(resetPassword(resetPwd, useInStorage.token))
            swal({
                title: "Password change successfully",
                icon: "success"
            })
            dispatch(LogoutUser())
            navigate('/login')
            
        } else {
            swal({
                title: "Error",
                icon: "error"
            })
        }
    }

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <h3 className="text-center">Forgot password</h3>
                <div className="form-group">
                    <label className="col-sm-2 col-form-label">Actual password</label>
                    <input type="password" className="form-control" placeholder='Password' name="actualPassword" onChange={(e) => changePassword(e)} />
                    <small id="actualPassword" className="text-danger"></small>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 col-form-label">New password</label>
                    <input type="password" className="form-control" placeholder='Password' name="password" onChange={(e) => changePassword(e)} />
                    <small id="password" className="text-danger"></small>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 col-form-label">Repeat password</label>
                    <input type="password" className="form-control" placeholder='Repeat password' name="passwordConfirm" onChange={(e) => changePassword(e)} />
                    <small id="passwordConfirm" className="text-danger"></small>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-outline-primary mt-5 ">Submit</button>
                </div>
            </form>
        </FormContainer>
    )
}
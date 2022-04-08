import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import swal from 'sweetalert'
import { FormContainer } from '../form/FormCreateStyles'

interface RESET_PASSWORD {
    password: string;
    confirmPassword: string;
}

export default function ResetForcePassword(): JSX.Element {
    const dispatch = useDispatch()
    const [reset, setReset] = useState<RESET_PASSWORD>({
        password: "",
        confirmPassword: ""
    })

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault()
        setReset({
            ...reset,
            [e.target.name]: e.target.value
        })
        console.log(reset.password)
    }

    const handleShow = (password: string): void => {
        if (password.length < 8 || password.length > 20) {
            console.log(document.getElementById("password"))
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if (reset.password !== "" && reset.confirmPassword !== "") {
            handleShow(reset.password)
            if (reset.password === reset.confirmPassword) {
                swal({
                    title: "Reset password",
                    icon: "success"
                })
            } else {
                swal({
                    title: "Don't match passwords",
                    icon: "error"
                })
            }
            console.log(reset)
        } else {
            swal({
                title: "Fields missing",
                icon: "error"
            })
        }
    }
    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <h3 className="text-center">Forgot password</h3>
                <div className="form-group">
                    <label className="col-sm-2 col-form-label">New password</label>
                    <input type="text" className="form-control" placeholder='Password' name="password" onChange={(e) => changePassword(e)} />
                    <small id="password" className={reset.password.length < 8 || reset.password.length > 20 ? "text-danger" : "text"} >{reset.password.length < 8 || reset.password.length > 20 ? "Must be 8-20 characters long" : "Long is okay"}</small>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 col-form-label">Repeat password</label>
                    <input type="text" className="form-control" placeholder='Repeat password' name="confirmPassword" onChange={(e) => changePassword(e)} />
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-outline-primary mt-5 ">Submit</button>
                </div>
            </form>
        </FormContainer>
    )
}
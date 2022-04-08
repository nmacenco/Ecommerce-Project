import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router';
import swal from 'sweetalert'
import { FormContainer } from '../form/FormCreateStyles'

interface RESET_PASSWORD {
    password: string;
    confirmPassword: string;
}

export default function ResetForcePassword(): JSX.Element {
    const dispatch = useDispatch()
    const navigate = useNavigate()
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

    const handleShow = (password: string, confirmPassword: string): void => {
        if (password.length < 8 || password.length > 20) {
            (document.getElementById("password") as HTMLInputElement).textContent = "Must be 8-20 characters long"
            console.log(document.getElementById("password"))
        }

        if (password !== confirmPassword) {
            (document.getElementById("confirmPassword") as HTMLInputElement).textContent = "Passwords don't match"
        }

    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        if (reset.password !== "" && reset.confirmPassword !== "") {
            handleShow(reset.password, reset.confirmPassword)
            if (reset.password === reset.confirmPassword) {
                swal({
                    title: "Reset password",
                    icon: "success"
                })
                navigate("/products") // PONER RUTA DE PERFIL DE USUARIO
            } else {
                swal({
                    title: "Don't match passwords",
                    icon: "error"
                })
            }
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
                    <small id="password" className="text-danger"></small>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 col-form-label">Repeat password</label>
                    <input type="text" className="form-control" placeholder='Repeat password' name="confirmPassword" onChange={(e) => changePassword(e)} />
                    <small id="confirmPassword" className="text-danger"></small>
                </div>
                <div className="text-center">
                    <button type="submit" className="btn btn-outline-primary mt-5 ">Submit</button>
                </div>
            </form>
        </FormContainer>
    )
}